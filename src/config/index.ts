import axios from 'axios';
import { REACT_APP_MANAGEMENT_URI } from '../constants';

export default axios.create({
    baseURL: REACT_APP_MANAGEMENT_URI
});
