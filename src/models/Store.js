export default {
  characters: [   // 存储角色信息，支持多角色
    // {
    //   hasActed: false,
    //   location: '',  // 角色所处的位置，值为对应的block的索引
    //   role: '',      // player选择的角色是哪一个，有效的角色编号0~1
    //   name: 'youngbeen',
    //   maxEnergy: 20,
    //   energy: 20,
    //   maxMagic: 15,
    //   magic: 15,
    //   maxSp: 100,
    //   sp: 0,
    //   gold: 0,
    //   power: 1,   // 角色消耗1个能量时可以造成的破坏力
    //   raceSkills: [],
    //   givenSkills: [],
    // }
  ],
  roles: [
    {
      id: 0,
      name: '侏儒泰泰',
      description: '聪明的侏儒泰泰，显得务实可靠',
      raceSkill: 0
    },
    {
      id: 1,
      name: '摩多可古',
      description: '源自古老神秘的魔古种族，拥有一身蛮力',
      raceSkill: 1
    },
    {
      id: 2,
      name: '布林顿5000型',
      description: '造物主的精美作品，机械组成的身体成为其最有利的条件',
      raceSkill: 2
    },
    {
      id: 3,
      name: '矮人奈妮',
      description: '敦厚，直率是矮人带给大家的第一印象。矮人喜欢长期在地下进行考古探索，探寻古老的秘密',
      raceSkill: 3
    },
    {
      id: 4,
      name: '精灵艾弗',
      description: '优雅，高贵的精灵种族同样是比较古老的种族。敏捷，迅速的行动是他们最大的特点',
      raceSkill: 4
    },
    {
      id: 5,
      name: '狼人霍格',
      description: '丑陋而野蛮，拥有一副无情锋利的獠牙，能瞬间将猎物撕碎',
      raceSkill: 5
    },
    {
      id: 6,
      name: '侏儒妮妮',
      description: '天真可爱的外表之下，拥有着与身材严重不符的能力',
      raceSkill: 6
    },
    {
      id: 7,
      name: '法师布兰妮',
      description: '美丽，大方，天生聪明的人类与魔法具有很强的亲和力',
      raceSkill: 7
    },
    {
      id: 8,
      name: '女兽人胡科',
      description: '脾性虽然粗俗，野蛮；但兽人始终也掩藏着率直而直接的个性',
      raceSkill: 8
    },
    {
      id: 9,
      name: '牛头人旺达',
      description: '庞大结实的身躯，宽大的蹄子，坚毅的代表',
      raceSkill: 9
    },
    {
      id: 10,
      name: '长牙巨魔崔克',
      description: '深蓝色皮肤覆盖的瘦高身躯，这个也同样古老的种族经历的种种磨难使得他们变得阴险而狡诈',
      raceSkill: 10
    },
    {
      id: 11,
      name: '阴暗者',
      description: '终日隐藏在暗影中，冷酷的阴暗者从不会说一句话，所以它们也从来没有名字来代表',
      raceSkill: 11
    }
  ],
  raceSkills: [
    {
      id: 0,                // id
      name: 'rGainDirt',    // 名称
      text: '灰土挑拣',      // 用于显示的名称
      type: 'buff',         // 技能类型，buff - 增益效果，debuff - 减益效果
      duration: -1,         // 持续回合数，-1 - 永久，0 - 瞬时
      costMagic: 0,         // 消耗的magic值
      costSp: 0,            // 消耗的SP值
      description: '从破坏的灰土中拾取出对你有益的东西，破坏灰土时有一定几率（20%）回复少量能量'                  // 技能描述
    },
    {
      id: 1,
      name: 'rBigPower',
      text: '蛮力',
      type: 'buff',
      duration: -1,
      costMagic: 0,
      costSp: 0,
      description: '力量永久增加1点，能更轻易地破坏任何障碍'
    },
    {
      id: 2,
      name: 'rBotHand',
      text: '机械手臂',
      type: 'buff',
      duration: -1,
      costMagic: 0,
      costSp: 0,
      description: '借助装置的机械手臂可以挖掘或拾取更远的目标'
    },
    {
      id: 3,
      name: 'rDwrafBlood',
      text: '矮人血脉',
      type: 'buff',
      duration: -1,
      costMagic: 0,
      costSp: 0,
      description: '能发现更多的财宝'
    },
    {
      id: 4,
      name: 'rAgile',
      text: '迅捷',
      type: 'buff',
      duration: -1,
      costMagic: 0,
      costSp: 0,
      description: '行走不会耗费任何能量'
    },
    {
      id: 5,
      name: 'rHurgerEat',
      text: '暴食',
      type: 'buff',
      duration: -1,
      costMagic: 0,
      costSp: 0,
      description: '食用食物可以获得额外的能量'
    },
    {
      id: 6,
      name: 'rAbsorbDirt',
      text: '灰土汲取',
      type: 'buff',
      duration: -1,
      costMagic: 0,
      costSp: 0,
      description: '力量会随着挖掘或破坏灰土的数量而缓慢增加'
    },
    {
      id: 7,
      name: 'rMagicLover',
      text: '魔力亲和',
      type: 'buff',
      duration: -1,
      costMagic: 0,
      costSp: 0,
      description: '最大魔法值增加，另外你使用药剂时也能同时回复微量能量'
    },
    {
      id: 8,
      name: 'rAnger',
      text: '鲁莽',
      type: 'buff',
      duration: -1,
      costMagic: 0,
      costSp: 0,
      description: '所有行动获得额外的SP值'
    },
    {
      id: 9,
      name: 'rStrong',
      text: '强壮',
      type: 'buff',
      duration: -1,
      costMagic: 0,
      costSp: 0,
      description: '最大的能量值增加'
    },
    {
      id: 10,
      name: 'rWildTrain',
      text: '野外训练',
      type: 'buff',
      duration: -1,
      costMagic: 0,
      costSp: 0,
      description: '有一定的几率(25%)可以完全规避陷阱的伤害'
    },
    {
      id: 11,
      name: 'rDarker',
      text: '暗影使者',
      type: 'buff',
      duration: -1,
      costMagic: 0,
      costSp: 0,
      description: '黑夜不会对你的视野造成影响'
    }
  ],
  givenSkills: [
    {
      id: 0,                // id
      name: 'gEye',         // 名称
      text: '透视',          // 用于显示的名称
      type: 'buff',         // 技能类型，buff - 增益效果，debuff - 减益效果
      duration: 5,          // 持续回合数，-1 - 永久，0 - 瞬时
      costMagic: 8,         // 消耗的magic值
      costSp: 100,          // 消耗的SP值
      description: '使你可以透视你周围的块，看到隐藏在障碍内的宝藏'          // 技能描述
    },
    {
      id: 1,
      name: 'gBoom',
      text: '强力爆破',
      type: 'buff',
      duration: 0,
      costMagic: 15,
      costSp: 100,
      description: '放置一枚炸弹，爆破会炸开你周围的所有障碍，使隐藏的宝藏暴露出来（爆破也会直接清除对你不利的陷阱）'
    }
  ]
}
