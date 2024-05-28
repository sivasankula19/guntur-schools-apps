import React from 'react';
import { useParams } from 'react-router';
import PreLoginHead from '../components/PreLoginHead';
import { IonIcon, IonText } from '@ionic/react';
import { checkmarkCircleOutline, closeCircleOutline } from 'ionicons/icons';

const Courses: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  const courseLabels = [{
    id:'course',
    colName:'Course',
    col:'courseName'
  },{
    id:'tMedium',
    colName:'TM',
    col:'isTM',
  },{
    id:'eMedium',
    colName:'EM',
    col:'isEM',
  }]
  const courseData = [
    {
      id:'sixcls',
      courseName:'6th Class',
      isTM:true,
      isEM:true,
    },
    {
      id:'sevencls',
      courseName:'7th Class',
      isTM:true,
      isEM:true,
    },
    {
      id:'eightcls',
      courseName:'8th Class',
      isTM:true,
      isEM:true,
    },
    {
      id:'ninecls',
      courseName:'9th Class',
      isTM:true,
      isEM:true,
    },
    {
      id:'tenthcls',
      courseName:'10th Class',
      isTM:true,
      isEM:true,
    },
    {
      id:'ploycls',
      courseName:'Politech Couching',
      isTM:false,
      isEM:true,
    },
    {
      id:'aprscls',
      courseName:'APRJC couching',
      isTM:true,
      isEM:true,
    },

  ]

  return (
    <div className='courses_page'>
      <IonText>
        <p>Courses Offered!</p>
      </IonText>
      <div>
        <div className='course_row'>
          {
            courseLabels.map((col:any)=>(<div style={{width:`${100/3}%`, border:'1px solid'}} className='course_col_head' key={col.id}>
             {col.colName}
            </div>))
          }
        </div>
        {courseData.map((courseItem:any)=>( <div key={courseItem.id} className='course_row'>
          {
            courseLabels.map((col:any, index:number)=>(<div style={{width:`${100/3}%`, border:'1px solid'}} className='course_col_head' key={courseItem.id + col.id}>
             {col.col === 'courseName' ? <>{courseItem[col.col]}</> : <>
               <IonIcon icon={courseItem[col.col] ? checkmarkCircleOutline : closeCircleOutline}></IonIcon>
             </>}
            </div>))
          }
        </div>))}
      </div>
    </div>
  );
};

export default Courses;
