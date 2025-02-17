interface SNSAccount {
  domain: "KAKAO" | "NAVER";
  email: "string";
}

export interface User {
  nickname: string;
  email: string;
  myHomneCount: number;
  //   mySoundSourceCount: number;
  //   registeredDate: string;
  //   snsAccountinfo: SNSAccount[];
  //   termsOfUseAgreement: boolean;
  //   personalInformationAgreement: boolean;
}
