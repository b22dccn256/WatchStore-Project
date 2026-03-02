import { Helmet } from 'react-helmet-async';

const Meta = ({ title, description, keywords }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description} />
            <meta name='keyword' content={keywords} />
        </Helmet>
    );
};

// Giá trị mặc định nếu không truyền gì vào
Meta.defaultProps = {
    title: 'Chào mừng đến với WatchStore',
    description: 'Chúng tôi bán những chiếc đồng hồ tốt nhất với giá rẻ nhất',
    keywords: 'đồng hồ, đồ điện tử, đồng hồ giá rẻ',
};

export default Meta;