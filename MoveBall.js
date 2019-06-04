import React, { Component } from 'react';
import { View, StyleSheet, Text, Dimensions, TouchableHighlight, PanResponder } from 'react-native';

//todo: make the ball expand and contract
//      change the angle when the ball hits the wall - modify xSpeed or ySpeed
class MoveBall extends React.Component {
	constructor() {
       super();
       this.state = { x: 50,
	                  y: 50,
						moveX: 0,
						moveY: 0,
						x0: 0,
						y0: 0,
						dx: 0,
						dy: 0,
					  xInc: true,
					  yInc: true,
					  xSpeed: 5,
					  ySpeed: 5,
						score1: 0,
						score2: 0,
					  diameter: 30,
            seconds: 0};
	}

	componentWillMount() {
    this.panResponderRef = PanResponder.create ( {
		  onStartShouldSetPanResponder: () => true,
		  onMoveShouldSetPanResponder: () => true,
		  onPanResponderGrant: this.doNothing,
		  onPanResponderMove: this.doNothing,
		  onPanResponderRelease: this._handlePanResponderMove,
		  onPanResponderTerminate:this.doNothing,
		  } );
  }

	_handlePanResponderMove = (event, gestureState) => {
 this.setState({
	 stateID: gestureState.stateID,
	 moveX: gestureState.moveX,
	 moveY: gestureState.moveY,
	 x0: gestureState.x0,
	 y0: gestureState.y0,
	 dx: gestureState.dx,
	 dy: gestureState.dy,
	 xSpeed: gestureState.vx,
	 ySpeed: gestureState.vy,
	 numberActiveTouches: gestureState.numberActiveTouches
 });
};

	timerEvent = () => {
		//get the dimensions of the screen
		let deviceWidth = Dimensions.get('window').width;
		let deviceHeight = Dimensions.get('window').height;

		//update the current x coordinates
		let curX = this.state.x;
		let curXDir = this.state.xInc;
		if (curXDir) {
			curX += this.state.xSpeed;
			if (curX > deviceWidth-this.state.diameter) {
				curXDir = false;
			}
		}
		else  {
			curX -= this.state.xSpeed;
			if (curX < 0) {
				curXDir = true;
			}
		}

		//update the current y coordinates
		let curY = this.state.y;
		let curYDir = this.state.yInc;
		if (curYDir) {
			curY += this.state.ySpeed;
			if (curY > deviceHeight-this.state.diameter) {
				curYDir = false;
				this.state.score1 +=1
			}
			if(this.state.ySpeed < 5){
				this.setState({
							x: 50,
	 	          y: 50,
	 						moveX: 0,
	 						moveY: 0,
	 						x0: 0,
	 						y0: 0,
	 						dx: 0,
	 						dy: 0,
	 					  xInc: true,
	 					  yInc: true,
	 					  xSpeed: 5,
	 					  ySpeed: 5,
	 					  diameter: 60,
	            seconds: 0,
				});
			}
		}
		else  {
			curY -= this.state.ySpeed;
			if (curY < 0) {
				curYDir = true;
				this.state.score2+=1
			}
		}
		//update state with local variables
        this.setState( {x: curX, y: curY, xInc: curXDir, yInc: curYDir} );
    };

  componentDidMount() {
    setInterval( this.timerEvent, 20 );
  }

  ballStyle = function(options) {
     return {
      position: "absolute",
      right: this.state.x,
      top: this.state.y,
      height: this.state.diameter,
	  width: this.state.diameter,
	  borderRadius: this.state.diameter/2,
	  backgroundColor: 'yellow',
     }
 }

   render() {
      return (
	    <View style={styles.container}>
			<View style={styles.timerView}>
             <Text style = {styles.textCenter}>
                  {this.state.score1}-{this.state.score2}
              </Text>
          </View>
		  <View style={styles.theNet}>
			</View>
		  <View style={this.ballStyle()}{...this.panResponderRef.panHandlers}>
		  </View>
		</View>
	  );
  }
}
function round(n) {
  if (!n) {
    return 0;
  }
  return Math.round(n);
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
	  backgroundColor: 'lightblue',
		justifyContent: 'center',
	  },
		timerView: {
    flex: 0.1,
    alignItems: 'center',
  },
  theNet: {
    flex: 0.02,
    backgroundColor: "black",
  },
	textCenter: {
        fontSize: 60,
        textAlign: 'center',
        color: 'black',
  },
});

export default MoveBall;
