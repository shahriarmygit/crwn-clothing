import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {ReactComponent as Logo} from '../../assets/crown.svg';
import './header.style.scss';
import { auth } from '../../firebase/firebase-utils';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import CartIcon from '../cart-icon/cart-icon.component';

const Header = ({ currentUser, hidden }) => (
    <div className='header'>
        <Link className='logo-container' to='/'>
            <Logo className='logo'/>
        </Link>
        <div className='options'>
            <Link className='option' to='/shop'>
            SHOP
            </Link>
            <Link className='option' to='/contact'>
            CONTACT
            </Link>
            {currentUser ? (
            <div className='option cursor' onClick={() => auth.signOut()}>
            SIGN OUT
            </div>
            ) : (
            <Link className='option' to='/signin'>
            SIGN IN
            </Link>
            )}

           <CartIcon currentUser={currentUser} />
        </div>
        {hidden ? null : <CartDropdown /> }
    </div>
);

const mapStateToProps = ({user: {currentUser}, cart: {hidden} }) => ({
    currentUser,
    hidden
})
export default connect(mapStateToProps)(Header);