var React = require('react')
var ReactPivot = require('react-pivot')
var createReactClass = require('create-react-class')
import rows from './data.json';

module.exports = createReactClass({
  render() {
    var dimensions = [
      {value: 'host', title: 'Host'},
      {value:'date',title:'Date'}
    ]

    var reduce = function(row, memo) {
      
      if(row.type==="impression"){
        memo.impressionTotal  = (memo.impressionTotal || 0) + 1;
      }
      if(row.type==="load"){
        memo.loadTotal = (memo.loadTotal || 0) + 1;
      }
      if(row.type==="display"){
        memo.displayTotal = (memo.displayTotal || 0) + 1;
      }
      memo.count = (memo.count || 0) + 1
      return memo
    }
  
    var calculations = [
      {title: 'Impressions', value: 'impressionTotal'},
      {title: 'Loads', value: 'loadTotal'},
      {title: 'Displays', value: 'displayTotal'},
      {title: 'Load Rate', value: 'loadRateTotal',
        template:function(val,row){
          return (((row.loadTotal ||0) / row.count)*100).toFixed(1)+'%';
        }
      },
      {title: 'Display Rate', value: 'loadRateTotal',
        template:function(val,row){
          return (((row.displayTotal||0) / row.count)*100).toFixed(1)+'%';
        }
      },
      
    ]
    return <div>
      <ReactPivot rows={rows}
              dimensions={dimensions}
              reduce={reduce}
              calculations={calculations}
              nPaginateRows={25} />
    </div>
  }
})
