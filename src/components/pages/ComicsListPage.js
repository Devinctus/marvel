import { Helmet } from 'react-helmet';

import AppBanner from '../appBanner/AppBanner';
import ComicsList from '../comicsList/ComicsList';

const ComicsListPage = () => {
    return (
        <>
            <Helmet>
                <title>List of comics</title>
                <meta name="description" content="List of comics" />
            </Helmet>
            <AppBanner/>
            <ComicsList/>
        </>
    )
}

export default ComicsListPage;