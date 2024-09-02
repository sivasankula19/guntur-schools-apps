import { IonCard, IonCardContent, IonItem, IonText } from '@ionic/react'
import React from 'react'
import { convertToMultipleWords } from '../../common/utility'

function StudentInfoProCard({studentInfo}:any) {
  return (
    <IonCard>
    <IonCardContent className="progerss_student_content">
      {Object.keys(studentInfo).map((key: string) => (
        <IonItem key={key}>
          <div className="g_flex student_info_item">
            <IonText className="over_text">
              <span>{convertToMultipleWords(key)}</span>
            </IonText>
            <IonText>
              {studentInfo[key] === true ? (
                <>
                  <IonText>
                    <h5 className="success">Signed</h5>
                  </IonText>
                </>
              ) : studentInfo[key] === false ? (
                <>
                  <IonText>
                    <h5 className="danger">Non Signed</h5>
                  </IonText>
                </>
              ) : (
                <p>{studentInfo[key]}</p>
              )}
            </IonText>
          </div>
        </IonItem>
      ))}
    </IonCardContent>
  </IonCard>
  )
}

export default StudentInfoProCard