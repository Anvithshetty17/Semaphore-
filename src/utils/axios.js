import axios from 'axios'

if (!process.env.NEXT_PUBLIC_URL) {
    alert(
        'NEXT_PUBLIC_URL is not defined,please check your env variable or u missed the .env file'
    )
    throw new Error(
        'NEXT_PUBLIC_URL is not defined',
        'ur missing the env variable NEXT_PUBLIC_URL'
    )
}

export default axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_URL}`,
})