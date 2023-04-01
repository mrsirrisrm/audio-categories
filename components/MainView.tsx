import axios from 'axios';
import { useState } from 'react';
import { Categories } from './types';
import CategorisedView from './CategorisedView';
import BarLoader from "react-spinners/BarLoader";

const baseUrl = 'https://my-yamnet-pjv64acrga-uc.a.run.app/';

const MainView = () => {

    const [categories, setCategories] = useState<Categories | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const callApi = async (base64: string) => {
        setError(null);
        setCategories(null);
        setLoading(true);
        try {
            const res = await axios({
                method: 'post',
                url: `${baseUrl}wav`,
                headers: { 'Content-Type': 'application/json' },
                data: {
                    wav: base64
                }
            });
            if (res.data.error) {
                setError(res.data.error);
            } else {
                setCategories(res.data);
            }
        } catch (e) {
            setError('Error getting response from server');
        }
        setLoading(false);
    }

    return (
        <div> 
            <input type="file" onChange={e => {                
                const file = e.target.files?.[0];                
                if (!file) {return}
                const reader = new FileReader();
                reader.onloadend = (evt) => callApi((reader.result as string).split(',')[1]); // get everything after the comma, which is the base64 data                              
                reader.onerror = (evt) => setError("Could not read file");                
                reader.readAsDataURL(file);
            }}/>

            {loading && <div style={{marginTop: 20}}><BarLoader/></div>}

            {error && <div>{error}</div>}

            <CategorisedView categories={categories} />
        </div>
    )
}

export default MainView;