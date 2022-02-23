import React from "react";
import ContentLoader from 'react-content-loader';

const FollowersLoader = (props) => {
    return (
        <ContentLoader
            speed={2}
            width={350}
            height={220}
            viewBox="0 0 350 220"
            backgroundColor="#2e3b46"
            foregroundColor="#28343e"
            {...props}
        >
            <rect x="0" y="0" rx="8" ry="8" width="150" height="15" />

            <circle cx="25" cy="110" r="25" />
            <rect x="60" y="40" rx="8" ry="8" width="150" height="15" />
            <rect x="250" y="35" rx="12" ry="12" width="70" height="25" />

            <circle cx="25" cy="50" r="25" />
            <rect x="60" y="100" rx="8" ry="8" width="150" height="15" />
            <rect x="250" y="95" rx="12" ry="12" width="70" height="25" />


            <circle cx="25" cy="170" r="25" />
            <rect x="60" y="160" rx="8" ry="8" width="150" height="15" />
            <rect x="250" y="155" rx="12" ry="12" width="70" height="25" />

        </ContentLoader>
    );
};
export default FollowersLoader;
