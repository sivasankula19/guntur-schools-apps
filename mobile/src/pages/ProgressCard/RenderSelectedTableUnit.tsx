import { IonFooter, IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import { useEffect, useState } from "react";
import { unitMarksData } from "../../common/utility";

 const RenderSelectedTableUnit: React.FC<IRenderSelectedTableUnitProps> = ({
    selectedTab,
    selectedItem,
  }) => {
    const columnData = [
      { name: 'Subject', field: 'subjectName' },
      {name:'Total', field:'total'},
      { name: 'Grade', field: 'grade' },
      { name: 'Marks', field: 'marks' },
      { name: 'Remarks', field: 'remarks' },
    ];
  
    const [unitData, setUnitData] = useState<any>([]);
  
    useEffect(() => {
      // make rest API call for fetching unit data
      // make sure previous response data if exists dont call another api untill there was a change in that back response
      setUnitData(unitMarksData.map(marksObj => {
        const randomMarks = Math.floor(Math.random() * 101);
        return {...marksObj, marks:randomMarks, remarks:randomMarks >= 9 ? 'Pass' : 'Fail'}
      }))
    }, [selectedTab]);
  
    return (
      <>
        <IonHeader>
          <IonToolbar>
            <IonTitle>{selectedItem?.title}</IonTitle>
          </IonToolbar>
        </IonHeader>
  
        <div className='list_mark_view_container'>
          <div className="g_flex marks_column_header">
            {columnData.map((headItem, hIndex) => (
              <div
                key={hIndex}
                style={{
                  width: `${100 / columnData.length}%`,
                  borderRight:
                    hIndex !== columnData.length - 1 ? '1px solid' : 'none',
                  height: '40px',
                }}
                className="g_txt_center g_flex g_align_cntr g_jstfy_content_cntr"
              >
                {headItem.name}
              </div>
            ))}
          </div>
          {unitData.map((unitItem: any, index: number) => (
            <div className="g_flex marks_colum" key={index}>
              {columnData.map((bodyItem: any, bIndex) => (
                <div
                  key={bIndex}
                  style={{
                    width: `${100 / columnData.length}%`,
                    borderRight:
                      bIndex !== columnData.length - 1 ? '1px solid' : 'none',
                    color: unitItem[bodyItem.field] === 'Pass' ? '#00FF00' : unitItem[bodyItem.field] === 'Fail' ? '#FF0000' : '',
                    fontWeight: bodyItem.field === 'remarks' ? 'bold' : 'normal',
                  }}
                  className="g_txt_center g_flex g_align_cntr g_jstfy_content_cntr cell_marks"
                >
                  {unitItem[bodyItem.field] != null ?  unitItem[bodyItem.field] : '--'}
                </div>
              ))}
            </div>
          ))}
        </div>
        <IonFooter>
          <IonToolbar>
            <div className='g_flex g_space_btwn mark_rank_container'>
              <div className='g_flex g_space_btwn grand_marks'>
                <p className='font_bld'>Grand Total</p>
                <p>{`${unitData.reduce((acc:any, curr:any) => acc + (curr.marks || 0), 0)}`}</p>
              </div>
              <div className='g_flex g_space_btwn exam_rank'>
                <p className='font_bld'>Exam Rank</p>
                <p>3 Rd</p>
              </div>
            </div>
            
          </IonToolbar>
        </IonFooter>
      </>
    );
  };
  
  interface IRenderSelectedTableUnitProps {
    selectedTab: string;
    selectedItem: { id: string; title: string } | undefined;
  }

  export default RenderSelectedTableUnit
  