import Head from "next/head";
import Header from "../components/Header";

import RegisterForm from "../components/user/registerform";

const Login: React.FC = () => {
    return (
        <>
            <Head>
                <title>Register</title>
                <meta name="description" content="Exam app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header></Header>
            <RegisterForm></RegisterForm>
        </>
    );
};

export default Login;