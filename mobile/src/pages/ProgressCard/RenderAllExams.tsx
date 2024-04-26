import { IonFooter, IonHeader, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useRef, useState } from 'react';
import { allUnitsMarks, unitMarksData } from '../../common/utility';

const RenderAllExams: React.FC<IRenderAllExams> = ({}) => {
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
              className="g_txt_center g_flex g_align_cntr g_jstfy_content_cntr marks_column_header"
            >
              {'Subject'}
            </div>
            {subjects.map((subjectItem: any) => (
              <div
                key={subjectItem.subjectId}
                style={{ minHeight: '40px' }}
                className="g_txt_center g_flex g_align_cntr g_jstfy_content_cntr"
              >
                {subjectItem.subjectName}
              </div>
            ))}
          </div>
          <div className="horizontal_marks_container g_flex g_flex_direction_clm">
            <div className="g_flex">
              {allUnits.map((unitItem: any, index: number) => (
                <div
                  key={unitItem.id}
                  style={{
                    minWidth: `${
                     ( parentContainerRef.current.offsetWidth) +
                       ( allUnits.length <=
                      3
                        ? 0
                        : 10)
                    }px`,
                    width: `${
                     ( parentContainerRef.current.offsetWidth) +
                      (  allUnits.length <=
                      3
                        ? 0
                        : 10)
                    }px`,
                    borderRight:
                      index !== allUnits.length - 1 ? '1px solid' : 'none',
                    height: '40px',
                  }}
                  className="g_txt_center g_flex g_align_cntr g_jstfy_content_cntr marks_column_header"
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
                    minWidth: `${
                     ( parentContainerRef.current.offsetWidth) +
                       ( allUnits.length <=
                      3
                        ? 0
                        : 10)
                    }px`,
                    width: `${
                     ( parentContainerRef.current.offsetWidth) +
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
                      style={{ minHeight: '40px', color: unitItemsub['data']?.find(
                        (i: any) => i.subjectName === subjectItem.subjectName
                      )?.remarks === 'Fail' ? '#FF0000' : '' }}
                      className="g_txt_center g_flex g_align_cntr g_jstfy_content_cntr"
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
          <div className="g_flex g_space_btwn mark_rank_container">
            {allUnits.map((unitItemshow: any) => (
              <div key={unitItemshow.id}>
                <div>{unitItemshow.title}</div>
                <div>{unitItemshow.conductedFor}</div>
              </div>
            ))}
          </div>
        </IonToolbar>
      </IonFooter>
    </>
  );
};

interface IRenderAllExams {}

export default RenderAllExams;
