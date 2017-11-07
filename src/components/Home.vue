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
          v-model="txtData"
        ></textarea>
      </div>
      <h4>Apakah <strong>Jumlah interval kelas</strong> sudah diketahui?</h4>
      <div class="form-check form-check-inline">
        <label class="form-check-label">
          <input
            class="form-check-input"
            type="radio"
            name="chxInterval"
            id="chxIntervalNo"
            value="0"
            ref="chxInterval"
            @click="toggleInterval(false)"
            checked
          > Belum
        </label>
      </div>
      <div class="form-check form-check-inline">
        <label class="form-check-label">
          <input
            class="form-check-input"
            type="radio"
            name="chxInterval"
            id="chxIntervalYes"
            value="1"
            ref="chxInterval"
            @click="toggleInterval(true)"
          > Sudah
        </label>
      </div>
      <div class="form-check form-check-inline"
        v-show="showInputInterval"
      >
        <label class="form-check-label">
          <input
            type="number"
            class="form-control"
            v-model="txtInterval"
            placeholder="Masukkan nilai k..."
            >
        </label>
      </div>
      <div>
        <button
          type="button"
          class="btn btn-success"
          @click="processData"
        >
        Proses Data
        </button>
      </div>
    </form>
    <div class="card">
      <div class="card-body">
        <h4 style="padding-left: 15px">Rumus:</h4>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">R = (X<sub>max</sub> - X<sub>min</sub>) + 1
              <strong>{{ (rangeOfMeasure.string) ? ` = ${rangeOfMeasure.string}` : null }}</strong>
              <strong>{{ (rangeOfMeasure.result) ? ` = ${rangeOfMeasure.result}` : null }}</strong>
          </li>
          <li  class="list-group-item">k = 1 + 3.3 log n <strong>{{ calcInterval }}</strong></li>
          <li  class="list-group-item">i = R/k <strong>{{ resultInterval }}</strong></li>
          <!-- <li>grafik histogram, dan grafik poligon</li>
          <li>Mean, Median, modus</li>
          <li>Kwartil, desil, persentil, jenjang persentil</li>
          <li>Range, Mean Deviation (MD), Standard Deviation (SD)</li> -->
        </ul>

        <div class="container-inner">
          <h4>Tabel Distribusi Frekuensi</h4>
          <table class="table table-striped" ref="tblFrequency">
            <thead class="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col" class="text-center">Kelas Interval</th>
                <th scope="col" class="text-right">f</th>
                <th scope="col" class="text-right">x</th>
                <th scope="col" class="text-right">x<sup>2</sup></th>
                <th scope="col" class="text-right">fx</th>
                <th scope="col" class="text-right">fx<sup>2</sup></th>
                <th scope="col" class="text-right">fk</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(f, i) in listIntervalClass.reverse()">
                <td>{{ i + 1 }}.</td>
                <!-- Interval class -->
                <td class="text-center">{{ f[0] }}</td>
                <!-- Frequency (f) -->
                <td class="text-right">{{ f[1] }}</td>
                <!-- Middle class (x) -->
                <td class="text-right">{{ getMiddleClass(f[0]) }}</td>
                <!-- Middle class sup 2 (x2) -->
                <td class="text-right">{{ getSup(getMiddleClass(f[0])) }}</td>
                <!-- Frequency middle (fx) -->
                <td class="text-right">{{ getFreqMiddle(f[1], getMiddleClass(f[0])) }}</td>
                <!-- Frequency middle sup 2 (fx2) -->
                <td class="text-right">{{ getFreqMiddle(f[1], getSup(getMiddleClass(f[0]))) }}</td>
                <td class="text-right">{{ freqCumulatives[i] }}</td>
              </tr>
            </tbody>
            <thead class="thead-light">
              <tr>
                <th scope="col" colspan="2" class="text-center">&sum;</th>
                <th scope="col" class="text-right">{{ totalFreq }}</th>
                <th scope="col" class="text-right">&nbsp;</th>
                <th scope="col" class="text-right">&nbsp;</th>
                <th scope="col" class="text-right">{{ totalFreqMiddle }}</th>
                <th scope="col" class="text-right">{{ totalFreqMiddleSup }}</th>
                <th scope="col" class="text-right">{{ totalFreqCumulative }}</th>
              </tr>
            </thead>
          </table>
        </div>

        <div class="container-inner">
          <h4>Mean, Median, modus</h4>
          <ul class="list-group list-group-flush">
            <li class="list-group-item"><strong>Mean</strong> = x̄ = &sum;fx / f = {{ mean }}</li>
            <li class="list-group-item"><strong>Median</strong> = Mdn = Bb + [(1/2N - fxb) /fd] i = {{ median }}</li>
            <li class="list-group-item"><strong>Modus</strong> = {{ modus }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import getFrequency from '../utils/frequency';
  import getRangeOfMeasure from '../utils/rangeOfMeasure';
  import calcInterval from '../utils/calcInterval';
  import getIntervalClass from '../utils/intervalClass';

  export default {
    name: 'Home',
    mounted() {
      //
    },
    computed: {
      //
    },
    data() {
      return {
        lengthTxt: 0,
        fieldData: null,
        message: 'Silahkan anda masukkan data di textarea berikut, pisahkan setiap data dengan koma(,)',
        txtData: '109,102,84,130,145,112,95,87,114,152,114,121,138,144,113,90,82,107,104,111,97,119,147,153,134,142,127,122,106,98,132,136,145,118,127,149,122,112,117,147,134,142,86,136,132,141,129,122,140,116,106,129,93,146,136,133,118,102,88,92',
        showInputInterval: false,
        frequencies: [],
        rangeOfMeasure: {},
        intervalClasses: [],
        listIntervalClass: [],
        calcInterval: null,
        txtInterval: 0,
        resultInterval: null,
        freqCumulatives: [],
        totalFreq: 0,
        totalFreqMiddle: 0,
        totalFreqMiddleSup: 0,
        totalFreqCumulative: 0,
        mean: 0,
        median: 0,
        modus: 0,
      };
    },
    methods: {
      processData() {
        const data = this.$refs.txtData.value;
        const frequencies = (data) ? getFrequency(data) : [];
        const rangeOfMeasure = (data) ? getRangeOfMeasure(data) : [];

        let xClass = this.txtInterval;
        if (!xClass) xClass = calcInterval(data);
        const k = xClass.ceil || parseFloat(xClass);
        const i = Math.ceil(rangeOfMeasure.result / k); // i = R/k
        const intervalClasses = (data) ? getIntervalClass(data, i) : [];
        this.calcInterval = (xClass.string) ? xClass.string : `= ${xClass}`;
        this.frequencies = frequencies;
        this.rangeOfMeasure = rangeOfMeasure;
        this.intervalClasses = intervalClasses;
        this.listIntervalClass = this.sumIntervalClass();
        this.resultInterval = `= ${i}`;
        const cumulatives = this.listIntervalClass.map(e => e[1]);
        this.freqCumulatives = this.getFreqCumulative(cumulatives).reverse();

        // get sum of all
        const freqList = this.frequencies.map(f => f[1]);
        this.totalFreq = this.sum(freqList);
        const list = this.listIntervalClass.reverse();
        const freqMiddles = list.map((f) => {
          const result = this.getFreqMiddle(f[1], this.getMiddleClass(f[0]));
          return result;
        });
        const freqMiddleSups = list.map((f) => {
          const result = this.getFreqMiddle(f[1], this.getSup(this.getMiddleClass(f[0])));
          return result;
        });
        list.forEach((f, x) => {
          this.totalFreqCumulative += parseFloat(this.freqCumulatives[x]);
        });
        this.totalFreqMiddle = this.sum(freqMiddles);
        this.totalFreqMiddleSup = this.sum(freqMiddleSups);
      },
      getMiddleClass(data) {
        const splitData = data.split('-');
        const xMax = parseFloat(splitData[1]) || 0;
        const xMin = parseFloat(splitData[0]) || 0;
        const tmpResult = xMax + xMin;
        const result = (tmpResult % 2 === 0) ? tmpResult : (tmpResult + 1);
        return (result / 2);
      },
      getSup(value) {
        return parseFloat(value) * parseFloat(value);
      },
      getFreqMiddle(f, x) {
        return parseFloat(f) * parseFloat(x);
      },
      sumIntervalClass() {
        const hist = {};
        this.intervalClasses.forEach((c) => {
          hist[c.string] = 0;
          this.frequencies.map((freq) => {
            // while interval class include frequency
            if (c.ranges.includes(freq[0])) {
              if (c.string in hist) {
                hist[c.string] += freq[1];
              } else {
                hist[c.string] = 1;
              }
            }
            return true;
          });
        });
        return Object.keys(hist).map(key => [key, hist[key]]);
      },
      getFreqCumulative(cumulatives) {
        return cumulatives.reduce((a, x, i) => [...a, x + (a[i - 1] || 0)], []);
      },
      toggleInterval(e) {
        if (e) {
          this.showInputInterval = true;
        } else {
          this.showInputInterval = false;
          this.txtInterval = 0;
        }
      },
      sum(arr) {
        if (!arr) return 0;
        return arr.reduce((sum, x) => sum + x);
      },
    },
    watch: {
      totalFreqMiddle(e) {
        this.mean = Math.ceil(e / this.totalFreq);
      },
    },
  };
</script>
