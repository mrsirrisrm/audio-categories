import axios from 'axios';
import { useState } from 'react';
import { Categories } from './types';
import CategorisedView from './CategorisedView';

const baseUrl = 'http://localhost:8099/';

const MainView = () => {

    const [categories, setCategories] = useState<Categories | null>(null);
    const [error, setError] = useState<string | null>(null);

    const callApi = async (base64: string) => {
        setError(null);
        setCategories(null);
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

            {error && <div>{error}</div>}

            <CategorisedView categories={categories} />
        </div>
    )
}

export default MainView;