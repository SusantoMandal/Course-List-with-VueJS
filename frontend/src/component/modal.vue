<template>
  <div class='modal-wrapper'>
    <div class="mx-auto my-auto modal-template">

        <!-- close buuton -->
      <div class="d-grid gap-2 d-md-flex justify-content-md-end">
        <button type="button" class="btn btn-danger close" @click="closeModal">
          <font-awesome-icon icon="times" />
        </button>
      </div>

        <!-- Input field  -->
      <div id="input-field" v-if="whichMethod">
        <!-- Course Name input field -->
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">Course Name</span>
          </div>
          <input v-model="courseName" type="text" class="form-control" placeholder="Course Name" aria-label="Course Name"
            aria-describedby="basic-addon1">
        </div>
        <!-- subject input field -->
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">Subject</span>
          </div>
          <input v-model="subject" type="text" class="form-control" placeholder="Subject" aria-label="Subject"
            aria-describedby="basic-addon1">
        </div>
      </div>

      <!-- Deleted Warning -->
      <div v-else class="alert alert-danger text-center" role="alert">
        Are you sure you want to delete this data!
      </div>

      <!-- Bottom buttons -->
      <div class="d-grid gap-2 d-md-flex justify-content-md-end">
        <!-- cancel button -->
        <button type="button" class="btn btn-secondary" @click="closeModal">{{ cancelButton }} </button>
         <!-- ok button -->
         <button type="button" class="btn btn-success" @click="sendData">{{ okButton }} </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['whichMethod', 'cancelButton', 'okButton'],
  data() {
    return {
      courseName: '',
      subject: '',
    };
  },
  methods: {
    closeModal() {
      this.$emit('toggleTheModal');
    },
    sendData() {
      if (this.whichMethod) {
        const inputData = {
          courseName: this.courseName,
          subject: this.subject,
        };
        // console.log(inputData);
        this.$emit('call', inputData);
      } else {
        this.$emit('deleteCall');
      }
    },
  },

};
</script>

<style scoped>

.modal-template{
    width: 520px;
    background-color: whitesmoke;
    padding-top: 40px;
    padding: 20px;
    border: 3px solid rgb(0,0,0,0.2);
}

.modal-wrapper{
    background-color: rgb(0,0,0,0.2);
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    display: flex;
    align-items: center;
}

.close{
  margin-bottom: 13px;
}
</style>
