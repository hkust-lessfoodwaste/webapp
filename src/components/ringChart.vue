<script lang='jsx'>
import { toRaw } from 'vue';
import Canvas from '@antv/f2-vue';
import { Chart, Interval, Axis } from '@antv/f2';
const data = [
{
a: '1',
b: 0.6,
c: '1',
color: '#A81E2D'
},
{
a: '2',
b: 0.7,
c: '1',
color: '#67A784'
},
{
a: '3',
b: 0.8,
c: '1',
color: '#F48F22'
},
{
a: '1',
b: 0.4,
c: '2',
color: '#FFEBED'
},
{
a: '2',
b: 0.3,
c: '2',
color: '#E8FFF2'
},
{
a: '3',
b: 0.2,
c: '2',
color: '#FFF2E3'
}
];
export default {
  name: 'ringChart',
  props: ["summary"],
  data() {
    return {
      data: data
    }
  },
  methods: {
    process() {
      this.data[0].b = this.summary.meat / 100
      this.data[1].b = this.summary.vegetable / 100
      this.data[2].b = this.summary.rice / 100
      this.data[3].b = 1 - this.summary.meat / 100
      this.data[4].b = 1 - this.summary.vegetable / 100
      this.data[5].b = 1 - this.summary.rice / 100
    }
  },
  mounted() {
    this.process()

  },
  render() {
    return (
      <Canvas pixelRatio={ window.devicePixelRatio} >
        <Chart
          data={data}
          coord={{
          type: 'polar',
          transposed: true,
          innerRadius: 0.2,
          }}
        >
          <Interval x="a" y="b" color={{field: "color", callback: (value) => {return value}}} adjust="stack" />
        </Chart>
      </Canvas>
    );
  },
};
</script>

<style>
</style>