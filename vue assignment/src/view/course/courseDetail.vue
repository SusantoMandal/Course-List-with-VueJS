 <template>
  <div>
    <button class="btn btn-outline-dark back" @click="goPrev"><font-awesome-icon icon="arrow-left" /> Back</button>
    <h1 class="mt-5 text-center">Course Detail</h1>
    <div id="courseTable">
      <table class="table">
        <tbody>
          <tr>
            <th>Course Name</th>
            <td>{{ course.courseName }}</td>
          </tr>
          <tr>
            <th>Course Subject</th>
            <td>{{ course.subject }}</td>
          </tr>
          <tr>
            <th>Created At</th>
            <td>{{ course.createdAt }}</td>
          </tr>
          <tr>
            <th>Modify At</th>
            <td>{{ course.modifiedAt }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="d-grid gap-2 d-md-flex justify-content-md-center">
      <button class="btn btn-outline-warning me-md-2" type="button" @click="toggleModel(true,'CANCEL','OK')">
        EDIT
      </button>
      <button class="btn btn-outline-danger" type="button" @click="toggleModel(false,'NO','YES')">
        DELETE
      </button>
    </div>
    <modal-template v-if="showModal" :whichMethod="whichMethod" :cancelButton="cancelButton"
    :okButton="okButton"
    @toggleTheModal="toggleModel"
    @deleteCall="deleteCall"
    @call="putCall($event)"
    ></modal-template>
  </div>
</template>

<script>
/* eslint-disable no-useless-concat */

import { mapGetters } from 'vuex';
import modalTemplate from '../../component/modal.vue';

export default {
  components: {
    modalTemplate,
  },
  computed: {
    ...mapGetters('course', ['course']),
  },
  data() {
    return {
      id: this.$route.params.id,
      showModal: false,
      whichMethod: false,
      cancelButton: '',
      okButton: '',
    };
  },
  created() {
    this.getCourse();
  },
  methods: {
    goPrev() {
      this.$router.push('/');
    },
    async getCourse() {
      this.$store.dispatch('loader/showLoader');
      const courseId = this.id;
      await this.$store.dispatch('course/getData', courseId);
      this.$store.dispatch('loader/hideLoader');
    },

    toggleModel(whichMethod, left, right) {
      this.showModal = !this.showModal;
      this.whichMethod = whichMethod;
      this.cancelButton = left;
      this.okButton = right;
    },
    async deleteCall() {
      this.$store.dispatch('loader/showLoader');
      await this.$store.dispatch('course/deleteCourse', this.id);
      this.$router.push('/');
      this.$store.dispatch('alert/showAlert', 'Data Deleted Successfully!!');
    },
    async putCall(inputData) {
      this.$store.dispatch('loader/showLoader');
      await this.$store.dispatch('course/updateCourse', { id: this.id, inputData });
      this.toggleModel();
      this.$store.dispatch('loader/hideLoader');
      this.$store.dispatch('alert/showAlert', 'Data Updated Successfully!!');
    },
  },
};
</script>

<style>
#courseTable {
  margin: 2rem;
}
.back{
  margin: 1rem;
}
</style>
