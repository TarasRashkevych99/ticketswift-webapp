<template>
  <v-container align="center" justify="center">
    <v-card class="rounded-lg">
      <v-card-title class="chat-title">Secure Chat</v-card-title>
      <br />
      <v-card-text>
        <v-text-field
          v-model="message"
          :disabled="isMessageFieldDisabled"
          color="primary"
          base-color="primary"
          width="80%"
          :rules="messageRule"
          variant="outlined"
          autofocus="true"
          label="Message"
          type="text"
          @keyup.enter="sendMessage"
        ></v-text-field>
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn
          :disabled="isSendButtonDisabled"
          height="3rem"
          width="50%"
          variant="tonal"
          color="primary"
          @click="sendMessage"
        >
          Send
        </v-btn>
        <v-btn height="3rem" width="50%" variant="tonal" color="primary" @click="leaveRoom">
          Leave room
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({}),
  computed: {},
  mounted() {},
  methods: {}
}
</script>

<style scoped></style>
