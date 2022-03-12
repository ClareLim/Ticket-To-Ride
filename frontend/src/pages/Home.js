import React from 'react';


export default function Home() {
    return (

        <div class="ui form">
            <h3 class="ui top attached header">
                <p>Welcome Back!</p>
            </h3>

            <div class="ui attached segment">

            </div>
            <h3 class="ui attached header">
                Common Information: Price of Ticket: $100
            </h3>
            <div class="ui attached segment">
                <p></p>
            </div>
            <h3 class="ui bottom attached header">
                Components:
            </h3>






            <div class="ui message">
                <div class="header">Alert Message</div>
                <ul class="list">
                    <section className='underflow'>
                        <li>Alert for Underflow - There are only less than 10 seats occupied. We cannot breakeven yet ... </li>
                    </section>

                    <section className='overflow'>
                        <li>Alert for Overflow - The last seat has been taken. No more seats left!</li>
                    </section>
                </ul>
            </div>
        </div>
    );
}