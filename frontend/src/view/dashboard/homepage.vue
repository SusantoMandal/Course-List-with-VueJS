<template>
  <div>
<h1 class="mt-5 text-center">Course List</h1>
<div id="courseTable">
  <table class="table">
  <thead class="table-light">
        <tr>
          <th scope="col">Course Name</th>
          <th scope="col">Subject</th>
          <th scope="col">Detail</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="course in coursesData" :key="course.courseID">
          <td>{{ course.courseName }}</td>
          <td>{{ course.subject }}</td>
          <td>
  <button type="button" class="btn btn-outline-secondary wi" @click="courseDetail(course.courseID)">
              <font-awesome-icon icon="info-circle" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
</div>
<div class="d-grid gap-2 col-6 mx-auto">
  <button class="btn btn-outline-primary" type="button" @click="toggleModel(true,'CANCEL','OK')">Add Data</button>
</div>
<modal-template v-if="showModal" :whichMethod="whichMethod" :cancelButton="cancelButton"
    :okButton="okButton"
    @toggleTheModal="toggleModel"
    @call="postCourse($event)"
    ></modal-template>
  </div>
</template>

<script>
/* eslint-disable max-len */
import { mapGetters } from 'vuex';
import modalTemplate from '../../component/modal.vue';

export default {
  components: {
    modalTemplate,
  },
  data() {
    return {
      showModal: false,
      whichMethod: false,
      cancelButton: '',
      okButton: '',
    };
  },
  computed: {
    ...mapGetters('courses', [
      'coursesData',
    ]),
  },
  methods: {
    courseDetail(id) {
      this.$router.push(`/${id}`);
    },
    toggleModel(whichMethod, left, right) {
      this.showModal = !this.showModal;
      this.whichMethod = whichMethod;
      this.cancelButton = left;
      this.okButton = right;
    },
    async postCourse(inputData) {
      this.$store.dispatch('loader/showLoader');
      await this.$store.dispatch('courses/postData', inputData);
      this.toggleModel();
      this.$store.dispatch('loader/hideLoader');
      this.$store.dispatch('alert/showAlert', 'Data Added Successfully!!');
    },
    async getAllCourses() {
      this.$store.dispatch('loader/showLoader');
      await this.$store.dispatch('courses/getData');
      this.$store.dispatch('loader/hideLoader');
    },
  },
  created() {
    this.getAllCourses();
  },
};
</script>

<style>
#courseTable {
  margin: 2rem;
}
</style>
