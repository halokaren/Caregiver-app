/** 被照顾者性别 */
export type Gender = "male" | "female" | "other";

/** 护理需求 */
export interface CareDemand {
  id: string;
  /** 被照顾者性别 */
  gender: Gender;
  /** 被照顾者年龄 */
  age: number;
  /** 与发布者的关系 */
  relationship: string;
  /** 疾病或照护需求描述 */
  description: string;
  /** 薪资（元/月） */
  salary: number;
  /** 工作时间描述 */
  schedule: string;
  /** 地点（城市/区域） */
  location: string;
  /** 发布时间 */
  publishedAt: string;
  /** 发布者昵称（可选） */
  publisherName?: string;
}

/** 发布需求表单数据 */
export interface CareDemandForm {
  gender: Gender;
  age: number;
  relationship: string;
  description: string;
  salary: number;
  schedule: string;
  location: string;
}
