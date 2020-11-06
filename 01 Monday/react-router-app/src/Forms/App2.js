import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
//import './App.css';
import FormDemo from './FormDemo';
import ReservationForm from './FormDemoMultiple';

export default function App2() {
    return (
        <div className="text-center">
            <h3>Forms and Controlled Components</h3>
            <FormDemo/>
            <hr/>
            <h3>Handling multiple inputs</h3>
            <ReservationForm/>
        </div>
    )
}