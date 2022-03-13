import React, { Component } from 'react';


class Counter extends Component {
    state = { 
        count: 0
     } 

    handleIncrement = () => {

    }

    handleClassCounter = () => {
        let classes = 
    }
    render() { 
        return (
            <React.Fragment>
                <div className="container">
                    <p className="badge badge-info m-2"></p>
                    <button className='btn btn-secondary m-2'>Increment</button>
                </div>

            </React.Fragment>
        );
    }
}
 
export default Counter;