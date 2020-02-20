import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, signInWithGoogle } from '../../firebase/firebase-utils';

import './sign-in.style.scss';

class SingIn extends React.Component  {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

    handaleSubmit = async event => {
        event.preventDefault();

        const { email, password } = this.state;

        try{
            await auth.signInWithEmailAndPassword(email, password);
            this.setState ({email: '',password: ''});
        }catch (error) {
            console.error('error');
        }

    };

    handaleChange = event => {
        const {value, name} = event.target;

        this.setState ({ [name]: value })
    }

    render() {
        return(
            <div className='sign-in'>
                <h2>I Already Have An Account</h2>
                <span>Sign With Your Email And Password</span>

                <form onSubmit={this.handaleSubmit}>
                    <FormInput 
                        name='email' 
                        type='email' 
                        value={this.state.email} 
                        handaleChange={this.handaleChange}
                        label='email'
                        required
                    />
                    <FormInput 
                        name='password' 
                        type='password' 
                        value={this.state.password} 
                        handaleChange={this.handaleChange}
                        label='password' 
                        required
                    />
                    <div className='buttons'>
                        <CustomButton type='submit' >Sign In</CustomButton>
                        <CustomButton type='button' onClick={signInWithGoogle} isGoogleSignIn>
                            Sign in with Google
                        </CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}

export default SingIn;