import React, {Component, PropTypes } from 'react';
import { Text, TouchableOpacity, ScrollView, View, Dimensions, Image} from 'react-native';
import styles from './styles';
import { StockLine } from 'react-native-pathjs-charts';

class LineGraph extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // obtain data from props
    let indicData = this.props.data;
    // format the dates and numeric data for plotting
    let formatted = indicData.map(function (x) {
      return {date: Date.parse(x.date),
              value: Number(x.value.toFixed(2))};
    });
    let maxLen = Math.max.apply(null,
      indicData.map(function (x) {return Math.log10(x.value)}));
    // configure the graph
    let options = {
      width: 220,
      height: 250,
      color: '#2980B9',
      margin: {
        top: 10,
        left: maxLen < 3 ? 35 : 12*maxLen,
        bottom: 40,
        right: 10
      },
      animate: {
        type: 'delayed',
        duration: 200
      },
      axisX: {
        showAxis: true,
        showLines: false,
        showLabels: true,
        showTicks: false,
        zeroAxis: false,
        orient: 'bottom',
        tickValues: [],
        tickCount: 4,
        isDate: true,
        label: {
          fontFamily: 'Oswald-Regular',
          fontSize: 15,
          fontWeight: true,
          fill: '#34495E'
        }
      },
      axisY: {
        showAxis: true,
        showLines: false,
        showLabels: true,
        showTicks: false,
        zeroAxis: false,
        orient: 'left',
        tickValues: [],
        tickCount: 6,
        label: {
          fontFamily: 'Oswald-Regular',
          fontSize: 15,
          fontWeight: true,
          fill: '#34495E'
        }
      }
    }
    return (
      <View style={{marginLeft: 20, marginTop: 20}}>
        <StockLine data={[formatted]} options={options} xKey='date' yKey='value'/>
      </View>
    );
  }
}

LineGraph.propTypes = {
  data: React.PropTypes.array,
};

export default LineGraph;
