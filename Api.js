import axios from "axios";

const base = axios.create({
  baseURL: 'https://qlsc.maysoft.io/server/api/',
})

export default base;