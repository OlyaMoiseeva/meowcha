<template>
  <div>
    <div v-if="name === 'admin'" class="system">
      <p class="text-center">{{ text }}</p>
      <hr>
    </div>
    <div v-else class="wrap">
      <div class="message" :class="{ owner }">
        <span>{{ name }}</span>
        <p>{{ text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    text: String,
    owner: {
      type: Boolean,
      default:false
    }
  }
} 
</script>

<style scoped>
.system {
  margin-bottom: 1rem;
}
p {
  margin-bottom: 1rem;
}
.wrap {
  display: flex;
  flex-direction: column;
}
.message {
  padding: 1rem;
  margin: 0;
  width: 50%;
  box-shadow: 0 1px 0 0 rgba(50, 50, 50, 0.3);
  border-radius: 4px;
  background: #1976d2;
  position: relative;
  margin-bottom: 1rem;
}
.message p {
  margin-bottom: 0;
}
.message span {
  margin-bottom: 0;
  color: #000;
  font-size: 13px;
  font-weight: bold;
}
.owner {
  background: #fff;
  align-self: flex-end;
  color: #000;
}
.owner span {
  margin-bottom: 0;
  color: #1976d2;
  font-size: 13px;
  font-weight: bold;
}
</style>