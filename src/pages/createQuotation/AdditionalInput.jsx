import { Form, Radio, Input, FloatButton } from 'antd';

const AdditionalInput = ({ setActiveTab }) => (
  <div className="p-6 mx-auto max-w-7xl w-full h-[60vh] overflow-auto font-bold">
    <Form layout="vertical">
      <Form.Item label="① 建設用途 :">
        <Radio.Group className="flex flex-col">
          <Radio value="居住施設">居住施設 | 集合住宅・複合住宅・別荘</Radio>
          <Radio value="学校施設">学校施設 | 学校・教育施設</Radio>
          <Radio value="病院建築">病院建築 | 総合病院・特殊病院・診療所</Radio>
          <Radio value="宗教的な建物">
            宗教的な建物 | 寺院仏閣・教会・葬祭場
          </Radio>
          <Radio value="事務所等">
            事務所等 | 事務所・オフィスビル・放送局
          </Radio>
          <Radio value="商業施設">商業施設 | 商業建築・ホテル・宿泊施設</Radio>
          <Radio value="文化施設">
            文化施設 | 地域交流施設・文化施設・ホール
          </Radio>
          <Radio value="行政施設">
            行政施設 | 公館・大使館・庁舎・裁判所・会議場
          </Radio>
          <Radio value="公共施設">
            公共施設 | 郵便局・電話局・防衛施設・警察署・消防署
          </Radio>
          <Radio value="科学的建築">
            科学的建築 |
            動物園・植物園・水族館・気象台・天文台・プラネタリウム・研究所
          </Radio>
          <Radio value="宿泊施設">宿泊施設 | ホテル・保養所・旅館</Radio>
          <Radio value="展示施設">
            展示施設 | 美術館・博物館・資料館・記念館
          </Radio>
          <Radio value="工場施設">工場施設 | 工場</Radio>
          <Radio value="交通ビル">
            交通ビル | 駐車場・サービスエリア・空港ビル・バスターミナル
          </Radio>
          <Radio value="休養娯楽施設">
            休養娯楽施設 |
            浴場・サウナ・ボーリング場・ドライブイン・ヘルスセンター・ガソリンスタンド
          </Radio>
          <Radio value="スポーツ施設">
            スポーツ施設 | 競技場・野球場・体育館・武道場・プール・総合体育施設
          </Radio>
          <Radio value="社会福祉棟">
            社会福祉棟 |
            老人ホーム・老人福祉センター・児童福祉施設・保育所・保健所
          </Radio>
          <Radio value="その他の施設">その他の施設 | </Radio>
          <Radio value="土木工事">土木工事 | 土木工事</Radio>
        </Radio.Group>
      </Form.Item>
      <div className="flex flex-row flex-grow justify-between w-full  ">
        <Form.Item label="② 延床面積 :" className="flex flex-grow">
          <Input type="number" addonAfter="m²" step="0.000001" />
        </Form.Item>
        <Form.Item label="③ 提出先 :" className="flex flex-row flex-grow">
          <Radio.Group>
            <Radio value="1">提出単価を建設物価基準で計算</Radio>
            <Radio value="2">提出単価を仕入れ乗率基準で計算</Radio>
          </Radio.Group>
        </Form.Item>
      </div>
    </Form>
    <FloatButton
      shape="square"
      type="primary"
      description="次へ"
      className="mb-16 mr-10 animate-bounce"
    />
  </div>
);
export default AdditionalInput;
