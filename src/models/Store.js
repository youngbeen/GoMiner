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
      description: '矮人聪明的侏儒泰泰，显得务实可靠',
      raceSkill: 0
    },
    {
      id: 1,
      name: '摩多可古',
      description: '源自古老神秘的魔古种族，拥有一身蛮力',
      raceSkill: 1
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
      description: '你善于从破坏的灰土中拾取出对你有益的东西，破坏灰土时有一定几率（20%）为你自己回复少量能量'                  // 技能描述
    },
    {
      id: 1,
      name: 'rBigPower',
      text: '蛮力',
      type: 'buff',
      duration: -1,
      costMagic: 0,
      costSp: 0,
      description: '你的力量永久增加1点，使你能更轻易地破坏任何障碍'
    },
    {
      id: 2,
      name: 'rBotHand',
      text: '机械手臂',
      type: 'buff',
      duration: -1,
      costMagic: 0,
      costSp: 0,
      description: '你可以借助装置的机械手臂挖掘或拾取更远的目标'
    },
    {
      id: 3,
      name: 'rBigPower',
      text: '蛮力',
      type: 'buff',
      duration: -1,
      costMagic: 0,
      costSp: 0,
      description: '你的力量永久增加1点，使你能更轻易地破坏任何障碍'
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
