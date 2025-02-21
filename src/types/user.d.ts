interface SNSAccount {
  domain: "KAKAO" | "NAVER";
  email: "string";
}

export interface User {
  nickname: string;
  email: string;
  myHomeCount: number;
  mySoundSourceCount: number;
  registeredDate: string;
  snsAccountInfos: SNSAccount[];
  termsOfUseAgreement: boolean;
  personalInformationAgreement: boolean;
}
