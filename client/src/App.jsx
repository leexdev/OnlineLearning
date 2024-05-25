import { Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import { Fragment, useEffect } from 'react';
import DefaultLayout from '~/components/Layouts/DefaultLayout';
import gradeApi from './api/gradeApi';
import { AuthProvider } from './context/AuthContext';

function App() {
    useEffect(() => {
        const fetchGrades = async () => {
            const params = {
                _limit: 1,
            };
            const gradeList = await gradeApi.getAll(params);
            console.log(gradeList);
        };

        fetchGrades();
    }, []);
    return (
        <AuthProvider>
            <div className="App font-quicksand">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        let Layout = DefaultLayout;

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }

                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            ></Route>
                        );
                    })}
                </Routes>
            </div>
        </AuthProvider>
    );
}

export default App;
