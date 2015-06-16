"use strict";
var React = require('react-native');

var {
  Image,
  PixelRatio
} = React;

var RImage = React.createClass({
  propTypes: {
      srcset: React.PropTypes.object,
  },
  getInitialState:function(){
    return {
      imgsrc:""
    }
  },
  componentWillMount:function(event){
    var currDensity=PixelRatio.get();
    if(this.props.srcset){
      var srcset=this.props.srcset;
      if(srcset[currDensity]){
        this.setState({imgsrc:srcset[currDensity]});
      }
      else{
        var densities=[];
        for (var key in this.props.srcset){
          densities.push(parseFloat(key));
        }
        var closest = densities.reduce(function (prev, curr) {
          return (Math.abs(curr - currDensity) < Math.abs(prev - currDensity) ? curr : prev);
        });
        this.setState({imgsrc:srcset[closest+"x"]});
      }
    }
    else{
      throw(new Error("No srcset defined"));
    }
  },
  render:function(){
        return (
          <Image 
            source={{uri:this.state.imgsrc}} 
            {...this.props}/>
        );     
  }
});

module.exports = RImage;