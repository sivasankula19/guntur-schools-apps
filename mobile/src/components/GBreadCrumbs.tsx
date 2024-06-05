import React from 'react';
import GBreadCrumb from './GBreadCrumb';

const GBreadCrumbs: React.FC<IBreadCrumbsProps> = ({ data }) => {
  return (
    <div className='g_flex g_breadcrumbs'>
      {data.map((breadItem, index) => (
        <React.Fragment key={index}>
          <GBreadCrumb path={breadItem.path} bName={breadItem.bName}></GBreadCrumb>
          {index !== data.length - 1 && (
            <>
              <div className="separator_bread">/</div>
            </>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

interface NavigationItem {
  bName: string;
  path: string;
}
interface IBreadCrumbsProps {
  data: NavigationItem[];
}

export default GBreadCrumbs;
