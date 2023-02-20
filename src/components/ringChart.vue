<script lang='jsx'>
import { toRaw } from 'vue';
import Canvas from '@antv/f2-vue';
import { Chart, Interval, Axis,  LineGuide } from '@antv/f2';
import riceicon from "@/assets/rice_icon.svg";
import meaticon from "@/assets/meat_icon.svg";
import vegeicon from "@/assets/vege_icon.svg";
const mockData = [
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
      data: []
    }
  },
  methods: {
    process() {
      let data = JSON.parse(JSON.stringify(mockData))
      if (!this.summary) {
        var meat = 0
        var vegetable = 0
        var rice = 0
      } else {
        var { meat, vegetable, rice} = this.summary
      }
      data[0].b = Number(meat) / 100
      data[1].b = Number(vegetable) / 100
      data[2].b = Number(rice) / 100
      data[3].b = 1 - Number(meat) / 100
      data[4].b = 1 - Number(vegetable) / 100
      data[5].b = 1 - Number(rice) / 100
      this.data = data
    }
  },
  watch: {
    summary: {
      immediate: true,
      handler (newVal, oldVal) {
        this.process()
      }
    }
  },
  render() {
    return (
      <div className="container">
      <Canvas pixelRatio={ window.devicePixelRatio}>
        <Chart
          data={this.data}
          coord={{
          type: 'polar',
          transposed: true,
          innerRadius: 0.2,
          }}
        >
          <Interval x="a" y="b" color={{field: "color", callback: (value) => {return value}}} adjust="stack" />
        </Chart>
      </Canvas>
      </div>
    );
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
}
.icon {
  width: 3.5vw;
  height: 3.5vw;
  margin: 0.5vw;
}
</style>