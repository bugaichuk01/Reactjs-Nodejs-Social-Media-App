import React from "react";
import ContentLoader from 'react-content-loader';

const FollowersLoader = (props) => {
    return (
        <ContentLoader
            speed={2}
            width={695}
            height={120}
            viewBox="0 0 695 120"
            backgroundColor="#2e3b46"
            foregroundColor="#28343e"
            {...props}
        >
            <circle cx="35" cy="30" r="22" />
            <rect x="70" y="8" rx="13" ry="13" width="610" height="44" />

            <rect x="70" y="75" rx="13" ry="13" width="100" height="40" />
            <rect x="197.5" y="75" rx="13" ry="13" width="100" height="40" />
            <rect x="325" y="75" rx="13" ry="13" width="100" height="40" />
            <rect x="452.5" y="75" rx="13" ry="13" width="100" height="40" />
            <rect x="580" y="75" rx="13" ry="1313" width="100" height="40" />

        </ContentLoader>
    );
};
export default FollowersLoader;
