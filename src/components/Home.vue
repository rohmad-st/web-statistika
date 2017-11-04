<template>
  <div class="container">
    <form class="form-statistika">
      <div class="form-group">
        <label
          for="txtData"
        >
        {{ message }}
        </label>
        <textarea
          class="form-control"
          id="txtData"
          rows="3"
          ref="txtData"
        >
        </textarea>
      </div>
      <button
        type="button"
        class="btn btn-success"
        @click="processData"
      >
      Proses Data
      </button>
    </form>
    <hr>
    <table class="table table-striped">
      <thead class="thead-dark">
        <tr>
          <th scope="col">Kelas Interval</th>
          <th scope="col">f</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="frequency in frequencies">
          <td>{{ frequency[0] }}</td>
          <td>{{ frequency[1] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import getFrequency from '../utils/frequency';

  export default {
    name: 'Home',
    mounted() {
      //
    },
    data() {
      return {
        fieldData: null,
        message: 'Silahkan anda masukkan data di textarea berikut, pisahkan setiap data dengan koma(,)',
        frequencies: [],
      };
    },
    methods: {
      processData() {
        const data = this.$refs.txtData.value;
        const result = (data) ? getFrequency(data) : [];
        this.frequencies = result;
      },
    },
    watch: {
      //
    },
  };
</script>
