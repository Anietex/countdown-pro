import React, {Component} from 'react'


class Stopwatch extends Component {

    state = {
        minute: 0,
        seconds:0,
        miliseconds:0,
        paused: false,
        running: false,
        stopped: false,
        totalTime: 3,
        setting: {
            minutes: 0,
            seconds: 0
        }
    }

    handleChange = (event) => {
        this.state.setting[event.target.name] = event.target.value;
        this.setState({ setting: this.state.setting })
    }



    componentDidMount() {
        this.initMaterial();
    }


    formatNumber(number){
        return (''+number).padStart(2,'0')
    }

    startTime =()=>{
       this.setStartColor();
        let totalTime = this.state.totalTime*60;
        let seconds = 0;
        let minute =0;

        let breakPoinnts = totalTime/3;

        let warning = breakPoinnts*2;
        let timeout = breakPoinnts;

        this.setState({ running: true},() => {this.initMaterial()});

        let handler =  setInterval(() => {

          if(totalTime < 1 || this.state.stopped){
              clearInterval(handler);
              minute = 0;
              seconds = 0;
              this.setState({
                  stopped: false,
                  running: false,
                  seconds,
                  minute
              },() => {this.initMaterial()});
          }else {
              if(!this.state.paused){
                  totalTime-=1;

                  if(totalTime <= timeout){
                      this.setTimeoutColor();
                  }else if(totalTime <= warning ){
                      this.setWarningColor();
                  }

                  if(seconds === 59){
                      minute+=1;
                      seconds = 0
                  }else {
                      seconds+=1;
                  }
                  this.setState({seconds,minute},()=> { this.initMaterial() })
              }
          }
        },100)



    }

    pauseTime=()=>{
        this.setState({paused: true}, () => {this.initMaterial()})
    }

    stopTime =()=>{
        this.setState({stopped: true,running: false,paused: false}, () => {this.initMaterial()})
    }

    resetTime(){
        this.setState({totalTime: 0},() => {this.initMaterial()})
    }

    resumeTime =()=> {
        console.log('resume called')
        this.setState({paused: false,running: true}, () => {this.initMaterial()})
    }

    initMaterial(){
        window.M.FloatingActionButton.init( document.querySelectorAll('.fixed-action-btn'));
    }

    openModal=()=> {
        window.M.Modal.init(document.querySelectorAll('.modal'));
        let  modal = window.M.Modal.getInstance(document.querySelector('#modal1'))
        modal.open();
    };

    fullscreen =()=>{
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    }


    setStartColor =()=> {
        document.querySelector('.stopwatch').style.backgroundColor = '#8BC34A'
        document.querySelector('.stopwatch').style.color = '#fff'

    }

    setWarningColor =()=> {
        document.querySelector('.stopwatch').style.backgroundColor = '#FFEB3B'
        document.querySelector('.stopwatch').style.color = '#fff'
    }

    setTimeoutColor =()=> {
        document.querySelector('.stopwatch').style.backgroundColor = '#FF5252'
        document.querySelector('.stopwatch').style.color = '#fff'

    }

    render() {
        return (
            <div>
                <div id="modal1" className="modal">
                    <div className="modal-content">
                        <h4>Set Timeout</h4>
                        <div className="row">
                            <div className="input-field col s6">
                                <input  id="minute" type="number" className="validate" name='minute' onChange={(e)=>this.handleChange(e)}/>
                                    <label htmlFor="minute">Minutes</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="seconds" type="text" className="validate" name='seconds' onChange={(e)=>this.handleChange(e)}/>
                                    <label htmlFor="seconds">Seconds</label>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button  className="modal-close waves-effect waves-green btn">Save</button>
                    </div>
                </div>



                <div className='stopwatch'>
                    <div className='time'>
                        <span className='minute'>{this.formatNumber(this.state.minute)}</span>:
                        <span className='seconds'>{this.formatNumber(this.state.seconds)}</span>
                        {/*<span className='miliseconds'>{this.formatNumber(this.state.miliseconds)}</span>*/}
                    </div>
                </div>

                <div className="fixed-action-btn">
                    <a className="btn-floating btn-large red">
                        <i className="large material-icons">settings_applications</i>
                    </a>
                    <ul>
                        {(!this.state.running) && <li onClick={this.startTime}>
                                <a className="btn-floating yellow darken-1">
                                    <i className="material-icons">play_arrow</i>
                                </a>
                            </li>
                        }

                        { this.state.paused ?  <li onClick={this.resumeTime}>
                            <a className="btn-floating yellow darken-1">
                                <i className="material-icons">play_arrow</i>
                            </a>
                        </li>: this.state.running &&
                            <li onClick={this.pauseTime}>
                                <a className="btn-floating blue">
                                    <i className="material-icons">pause</i>
                                </a>
                            </li>
                        }
                        {this.state.running && !this.state.stopped && <li onClick={this.stopTime }>
                                <a className="btn-floating green">
                                    <i className="material-icons">stop</i>
                                </a>
                            </li>
                        }
                        <li><a className="btn-floating blue" onClick={this.fullscreen}><i className="material-icons">fullscreen</i></a></li>
                        <li><a className="btn-floating yellow darken-1" onClick={this.openModal}><i className="material-icons">settings</i></a></li>

                    </ul>
                </div>
            </div>

        );
    }
}

export default Stopwatch