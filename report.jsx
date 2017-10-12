var React = require('react')
  var ReactPivot = require('react-pivot')
var createReactClass = require('create-react-class')

var rows = require('./data.json')

module.exports = createReactClass({
  render () {
    return <div>
      <ReactPivot rows={rows}
        dimensions={dimensions}
        reduce={reduce}
        calculations={calculations}
        activeDimensions={['Date', 'Host']}
        compact={true}
      />
    </div>
  }
})

var dimensions = [
  {value: 'host', title: 'Host'},
  {value: 'date', title: 'Date'}
]

var reduce = function (row, memo) {
  switch (row.type) {
    case 'impression':
      memo.impressionTotal = (memo.impressionTotal || 0) + 1;
      if (memo.impressionTotal) {
        memo.loadRate = memo.loadTotal/memo.impressionTotal;
      }
      break;
    case 'load':
      memo.loadTotal = (memo.loadTotal || 0) + 1;
      if (memo.impressionTotal) {
        memo.loadRate = memo.loadTotal / memo.impressionTotal;
      }
      if (memo.loadTotal) {
        memo.displayRate = memo.displayTotal / memo.loadTotal;
      }
      break;
    case 'display':
      memo.displayTotal = (memo.displayTotal || 0) + 1;
      if (memo.loadTotal) {
        memo.displayRate = memo.displayTotal / memo.loadTotal;
      }
      break;
  }

  return memo
}

var calculations = [
  {
    title: 'Impressions',
    value: 'impressionTotal',
    template: function (val) {
      return val
    }
  },
  {
    title: 'Loads',
    value: 'loadTotal',
    template: function (val) {
      return val
    }
  },
  {
    title: 'Displays',
    value: 'displayTotal',
    template: function (val) {
      return val
    }
  },
  {
    title: 'Load Rate',
    value: 'loadRate',
    template: function (val) {
      var value = val*100;
      return value.toFixed(2) + '%';
    }
  },
  {
    title: 'Display Rate',
    value: 'displayRate',
    template: function (val) {
      var value = val*100;
      return value.toFixed(2) + '%';
    }
  }
]