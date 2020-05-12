<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
    >
      <v-card
        min-width="400"
      >
        <v-card-title>
          Nuxt чат
        </v-card-title>
        <v-card-text>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-text-field
              v-model="name"
              :counter="10"
              :rules="nameRules"
              label="Имя"
              required
            ></v-text-field>
        
            <v-text-field
              v-model="room"
              :rules="roomRules"
              label="Комната"
              required
            ></v-text-field>
        
            <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4"
              @click="submit"
            >
              Войти
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-snackbar
        v-model="snackbar"
        :multi-line="multiLine"
        top
      >
        {{ message }}
        <v-btn
          color="red"
          text
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </v-snackbar>
  </v-layout>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  layout: 'empty',
  head: {
    title: 'добро пож в накстчат'
  },
  sockets: {
    connect: function () {
      console.log('client IO connected')
    }
  },
  data: () => ({
    valid: true,
    name: '',
    nameRules: [
      v => !!v || 'Имя введи',
      v => (v && v.length <= 10) || 'Имя не должно превышать 16 символов',
    ],
    room: '',
    roomRules: [
      v => !!v || 'Укажи комнату'
    ],
    multiLine: true,
    snackbar: false,
    message: '',
  }),
  mounted() {
    const { message } = this.$route.query
    if (message === 'noUser') {
      this.message = "Введи данные"
    } else if (message === 'left_chat') {
      this.message = "Ты покинул чат"
    }
    this.snackbar = !!this.message
  },
  methods: {
    ...mapMutations(['setUser']),
    submit () {
      if (this.$refs.form.validate()) {
        const user = {
          name: this.name,
          room: this.room
        }
        this.$socket.emit('userJoined', user, (data) => {
          if (typeof data === 'string') {
            console.error(data)
          } else {
            user.id = data.userId
            this.setUser(user)
            this.$router.push('/chat')
          }
        })
      }
    }
  }
}
</script>
