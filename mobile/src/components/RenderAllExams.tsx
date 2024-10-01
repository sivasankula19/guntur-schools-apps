import { IonFooter, IonHeader, IonToolbar } from '@ionic/react';
import { useEffect, useRef, useState } from 'react';
import { allUnitsMarks } from '../common/utility';

const RenderAllExams: React.FC<IRenderAllExams> = ({ }) => {
  const subjects = [
    { subjectId: 'tel', subjectName: 'Telugu' },
    { subjectId: 'eng', subjectName: 'English' },
    { subjectId: 'hin', subjectName: 'Hindi' },
    { subjectId: 'mat', subjectName: 'Maths' },
    { subjectId: 'sci', subjectName: 'Science' },
    { subjectId: 'soc', subjectName: 'Social' },
  ];

  const parentContainerRef = useRef<any>();
  const [allUnits, setAllUnits] = useState<any>([]);

  useEffect(() => {
    setAllUnits(allUnitsMarks);
  }, []);

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <div className="g_txt_center">
            <p>Final Rank 39</p>
          </div>
        </IonToolbar>
      </IonHeader>

      <div className="list_mark_view_container">
        <div className="g_flex">
          <div
            ref={parentContainerRef}
            style={{
              width: `25%`,
              borderRight: '1px solid',
            }}
          >
            <div
              style={{ minHeight: '40px' }}
              className="g_txt_center g_flex g-align-center g-justify-center marks_column_header"
            >
              {'Subject'}
            </div>
            {subjects.map((subjectItem: any) => (
              <div
                key={subjectItem.subjectId}
                style={{ minHeight: '40px' }}
                className="g_txt_center g_flex g-align-center g-justify-center"
              >
                {subjectItem.subjectName}
              </div>
            ))}
          </div>
          <div className="horizontal_marks_container g_flex g-flex-direction-clm">
            <div className="g_flex">
              {allUnits.map((unitItem: any, index: number) => (
                <div
                  key={unitItem.id}
                  style={{
                    minWidth: `${(parentContainerRef.current.offsetWidth) +
                      (allUnits.length <=
                        3
                        ? 0
                        : 10)
                      }px`,
                    width: `${(parentContainerRef.current.offsetWidth) +
                      (allUnits.length <=
                        3
                        ? 0
                        : 10)
                      }px`,
                    borderRight:
                      index !== allUnits.length - 1 ? '1px solid' : 'none',
                    height: '40px',
                  }}
                  className="g_txt_center g_flex g-align-center g-justify-center marks_column_header"
                >
                  {unitItem.title}
                </div>
              ))}
            </div>
            <div className="g_flex">
              {allUnits.map((unitItemsub: any, index: number) => (
                <div
                  key={unitItemsub.id}
                  style={{
                    minWidth: `${(parentContainerRef.current.offsetWidth) +
                      (allUnits.length <=
                        3
                        ? 0
                        : 10)
                      }px`,
                    width: `${(parentContainerRef.current.offsetWidth) +
                      (allUnits.length <=
                        3
                        ? 0
                        : 10)
                      }px`,
                    borderRight:
                      index !== allUnits.length - 1 ? '1px solid' : 'none',
                  }}
                >
                  {subjects.map((subjectItem: any) => (
                    <div
                      key={subjectItem.subjectId}
                      style={{
                        minHeight: '40px', color: unitItemsub['data']?.find(
                          (i: any) => i.subjectName === subjectItem.subjectName
                        )?.remarks === 'Fail' ? '#FF0000' : ''
                      }}
                      className="g_txt_center g_flex g-align-center g-justify-center"
                    >
                      {
                        unitItemsub['data']?.find(
                          (i: any) => i.subjectName === subjectItem.subjectName
                        )?.marks
                      }
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <IonFooter>
        <IonToolbar>
          <div className="g_flex g-space-between marks_all_container">
            <div style={{ width: '25%' }}>
              <div>Exam</div>
              <div>Total</div>
            </div>
            <div style={{ width: '75%', overflowX: 'auto' }}>
              <div style={{ display: 'flex' }}>
                {allUnits.map((unitItemshow: any) => (
                  <div style={{ width: '80px', minWidth: '80px' }} key={unitItemshow.id}>
                    <div>{unitItemshow.title}</div>
                    <div>{unitItemshow.conductedFor}</div>
                  </div>
                ))}
              </div>
            </div>


          </div>
        </IonToolbar>
      </IonFooter>
    </>
  );
};

interface IRenderAllExams { }

export default RenderAllExams;
