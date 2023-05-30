/**
 * @description 数字转中文数码
 *
 * @param {Number|String}   num     数字[正整数]
 * @param {String}          type    文本类型，lower|upper，默认upper
 *
 * @example number2text(100000000) => "壹亿元整"
 */
export const number2text = (number, type = "upper") => {
    // 配置
    const confs = {
        lower: {
            num: ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"],
            unit: ["", "十", "百", "千", "万"],
            level: ["", "万", "亿"]
        },
        upper: {
            num: ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"],
            unit: ["", "拾", "佰", "仟"],
            level: ["", "万", "亿"]
        },
        decimal: {
            unit: ["分", "角"]
        },
        maxNumber: 999999999999.99
    };

    // 过滤不合法参数
    if (Number(number) > confs.maxNumber) {
        console.error(
            `The maxNumber is ${confs.maxNumber}. ${number} is bigger than it!`
        );
        return false;
    }

    const conf = confs[type];
    const numbers = String(Number(number).toFixed(2)).split(".");
    const integer = numbers[0].split("");
    const decimal = Number(numbers[1]) === 0 ? [] : numbers[1].split("");

    // 四位分级
    const levels = integer.reverse().reduce((pre: any, item, idx) => {
        let level = pre[0] && pre[0].length < 4 ? pre[0] : [];
        let value =
            item === "0" ? conf.num[item] : conf.num[item] + conf.unit[idx % 4];
        level.unshift(value);

        if (level.length === 1) {
            pre.unshift(level);
        } else {
            pre[0] = level;
        }

        return pre;
    }, []);

    // 整数部分
    const _integer = levels.reduce((pre, item, idx) => {
        let _level = conf.level[levels.length - idx - 1];
        let _item = item.join("").replace(/(零)\1+/g, "$1"); // 连续多个零字的部分设置为单个零字

        // 如果这一级只有一个零字，则去掉这级
        if (_item === "零") {
            _item = "";
            _level = "";

            // 否则如果末尾为零字，则去掉这个零字
        } else if (_item[_item.length - 1] === "零") {
            _item = _item.slice(0, _item.length - 1);
        }

        return pre + _item + _level;
    }, "");

    // 小数部分
    let _decimal = decimal
        .map((item, idx) => {
            const unit = confs.decimal.unit;
            const _unit = item !== "0" ? unit[unit.length - idx - 1] : "";

            return `${conf.num[item]}${_unit}`;
        })
        .join("");

    // 如果是整数，则补个整字
    return `${_integer}元` + (_decimal || "整");
};



// 计费标准富文本
export const richText = `<p>
<span style="background-color: rgb(255, 255, 255); font-family: arial, helvetica, sans-serif; font-size: 14px;">国家计委、建设部关于房地产中介服务收费的通知</span>
</p>
<p>
<span style="background-color: rgb(255, 255, 255); font-family: arial, helvetica, sans-serif; font-size: 14px;">计价格［1995］971号</span>
</p>
<p>
<span style="background-color: rgb(255, 255, 255); font-family: arial, helvetica, sans-serif; font-size: 14px;">各省、自治区、直辖市物价局（委员会）、建委（建设厅），北京、天津、上海市房地产管理局：</span>
</p>
<p>
<span style="background-color: rgb(255, 255, 255); font-family: arial, helvetica, sans-serif; font-size: 14px;">为规范房地产中介服务收费行为，维护房地产中介服务当事人的合法权益，建立房地产中介服务收费正常的市场秩序，现就房地产中介服务收费的有关问题通知如下：</span>
</p>
<p>
<span style="background-color: rgb(255, 255, 255); font-family: arial, helvetica, sans-serif; font-size: 14px;"></span>
</p>
<p style="margin-top: 0px;margin-bottom: 0px;padding: 0px;border: 0px;outline: 0px;vertical-align: baseline;font-family: HiraginoGB3, 微软雅黑, 冬青黑体简体中文, Arial, Helvetica, sans-serif;font-size: medium;white-space: normal;background-color: rgb(255, 255, 255)">
<span style="font-family: arial, helvetica, sans-serif; font-size: 14px;">一、凡依法设立并具备房地产中介资格的房地产咨询、房地产价格评估、房地产经纪等中介服务机构，为企事业单位、社会团体和其他社会组织、公民及外国当事人提供有关房地产开发投资、经营管理、消费等方面的中介服务，可向委托人收取合理的费用。</span>
</p>
<p style="margin-top: 0px;margin-bottom: 0px;padding: 0px;border: 0px;outline: 0px;vertical-align: baseline;font-family: HiraginoGB3, 微软雅黑, 冬青黑体简体中文, Arial, Helvetica, sans-serif;font-size: medium;white-space: normal;background-color: rgb(255, 255, 255)">
<span style="font-family: arial, helvetica, sans-serif; font-size: 14px;">二、房地产中介服务收费是房地产交易市场重要的经营性服务收费。中介服务机构应当本着合理、公开、成实信用的原则，接受自愿委托，双方签订合同，依据本通知规定的收费办法和收费标准，由中介服务机构与委托方协商确定中介服务费。</span>
</p>
<p style="margin-top: 0px;margin-bottom: 0px;padding: 0px;border: 0px;outline: 0px;vertical-align: baseline;font-family: HiraginoGB3, 微软雅黑, 冬青黑体简体中文, Arial, Helvetica, sans-serif;font-size: medium;white-space: normal;background-color: rgb(255, 255, 255)">
<span style="font-family: arial, helvetica, sans-serif; font-size: 14px;">三、房地产中介服务收费实行明码标价制度。中介服务机构应当在其经营场所或交缴费用的地点醒目位置公布其收费项目、服务内容、计费方法、收费标准等事项。</span>
</p>
<p style="margin-top: 0px;margin-bottom: 0px;padding: 0px;border: 0px;outline: 0px;vertical-align: baseline;font-family: HiraginoGB3, 微软雅黑, 冬青黑体简体中文, Arial, Helvetica, sans-serif;font-size: medium;white-space: normal;background-color: rgb(255, 255, 255)">
<span style="font-family: arial, helvetica, sans-serif; font-size: 14px;">房地产中介服务机构在接受当事人委托时应当主动向当事人介绍有关中介服务的价格及服务内容等情况。</span>
</p>
<p style="margin-top: 0px;margin-bottom: 0px;padding: 0px;border: 0px;outline: 0px;vertical-align: baseline;font-family: HiraginoGB3, 微软雅黑, 冬青黑体简体中文, Arial, Helvetica, sans-serif;font-size: medium;white-space: normal;background-color: rgb(255, 255, 255)">
<span style="font-family: arial, helvetica, sans-serif; font-size: 14px;">四、房地产中介服务机构可应委托人要求，提供有关房地产政策、法规、技术等咨询服务，收取房地产咨询费。</span>
</p>
<p style="margin-top: 0px;margin-bottom: 0px;padding: 0px;border: 0px;outline: 0px;vertical-align: baseline;font-family: HiraginoGB3, 微软雅黑, 冬青黑体简体中文, Arial, Helvetica, sans-serif;font-size: medium;white-space: normal;background-color: rgb(255, 255, 255)">
<span style="font-family: arial, helvetica, sans-serif; font-size: 14px;">房地产咨询收费按服务形式，分为口头咨询费和书面咨询费两种。</span>
</p>
<p style="margin-top: 0px;margin-bottom: 0px;padding: 0px;border: 0px;outline: 0px;vertical-align: baseline;font-family: HiraginoGB3, 微软雅黑, 冬青黑体简体中文, Arial, Helvetica, sans-serif;font-size: medium;white-space: normal;background-color: rgb(255, 255, 255)">
<span style="font-family: arial, helvetica, sans-serif; font-size: 14px;">口头咨询费，按照咨询服务所需时间结合咨询人员专业技术等级由双方协商议定收费标准。</span>
</p>
<p style="margin-top: 0px;margin-bottom: 0px;padding: 0px;border: 0px;outline: 0px;vertical-align: baseline;font-family: HiraginoGB3, 微软雅黑, 冬青黑体简体中文, Arial, Helvetica, sans-serif;font-size: medium;white-space: normal;background-color: rgb(255, 255, 255)">
<span style="font-family: arial, helvetica, sans-serif; font-size: 14px;">书面咨询费，按照咨询报告的技术难度、工作繁简结合标的额大小计收。普通咨询报告 ，每份收费300-1000元；技术难度大，情况复杂、耗用人员和时间较多的咨询报告，可适当提高收费标准，收费标准一般不超过咨询标的额的0.5%。</span>
</p>
<p style="margin-top: 0px;margin-bottom: 0px;padding: 0px;border: 0px;outline: 0px;vertical-align: baseline;font-family: HiraginoGB3, 微软雅黑, 冬青黑体简体中文, Arial, Helvetica, sans-serif;font-size: medium;white-space: normal;background-color: rgb(255, 255, 255)">
<span style="font-family: arial, helvetica, sans-serif; font-size: 14px;">以上收费标准，属指导性参考价格。实际成交收费标准，由委托方与中介机构协商议定。</span>
</p>
<p style="margin-top: 0px;margin-bottom: 0px;padding: 0px;border: 0px;outline: 0px;vertical-align: baseline;font-family: HiraginoGB3, 微软雅黑, 冬青黑体简体中文, Arial, Helvetica, sans-serif;font-size: medium;white-space: normal;background-color: rgb(255, 255, 255)">
<span style="font-family: arial, helvetica, sans-serif; font-size: 14px;">五、房地产价格评估收费，由具备房地产估价资格并经房地产行政主管部门、物价主管部门确认的机构按规定的收费标准计收。</span>
</p>
<p style="margin-top: 0px;margin-bottom: 0px;padding: 0px;border: 0px;outline: 0px;vertical-align: baseline;font-family: HiraginoGB3, 微软雅黑, 冬青黑体简体中文, Arial, Helvetica, sans-serif;font-size: medium;white-space: normal;background-color: rgb(255, 255, 255)">
<span style="font-family: arial, helvetica, sans-serif; font-size: 14px;">以房产为主的房地产价格评估费，区别不同情况，按照房地产的价格总额采取差额定率分档累进计收。具体收费标准见附表。</span>
</p>
<p style="margin-top: 0px;margin-bottom: 0px;padding: 0px;border: 0px;outline: 0px;vertical-align: baseline;font-family: HiraginoGB3, 微软雅黑, 冬青黑体简体中文, Arial, Helvetica, sans-serif;font-size: medium;white-space: normal;background-color: rgb(255, 255, 255)">
<span style="font-family: arial, helvetica, sans-serif; font-size: 14px;">土地价格评估的收费标准，按国家计委、国家土地局《关于土地价格评估收费的通知》约有关规定执行。</span>
</p>
<p style="margin-top: 0px;margin-bottom: 0px;padding: 0px;border: 0px;outline: 0px;vertical-align: baseline;font-family: HiraginoGB3, 微软雅黑, 冬青黑体简体中文, Arial, Helvetica, sans-serif;font-size: medium;white-space: normal;background-color: rgb(255, 255, 255)">
<span style="font-family: arial, helvetica, sans-serif; font-size: 14px;">六、房地产经纪收费是房地产专业经纪人接受委托，进行居间代理所收取的佣金。房地产经纪费根据代理项目的不同实行不同的收费标准。</span>
</p>
<p style="margin-top: 0px;margin-bottom: 0px;padding: 0px;border: 0px;outline: 0px;vertical-align: baseline;font-family: HiraginoGB3, 微软雅黑, 冬青黑体简体中文, Arial, Helvetica, sans-serif;font-size: medium;white-space: normal;background-color: rgb(255, 255, 255)">
<span style="font-family: arial, helvetica, sans-serif; font-size: 14px;">房屋租赁代理收费，无论成交的租赁期限长短，均按半月至一月成交租金额标准，由双方协商议定一次性计收。</span>
</p>
<p style="margin-top: 0px;margin-bottom: 0px;padding: 0px;border: 0px;outline: 0px;vertical-align: baseline;font-family: HiraginoGB3, 微软雅黑, 冬青黑体简体中文, Arial, Helvetica, sans-serif;font-size: medium;white-space: normal;background-color: rgb(255, 255, 255)">
<span style="font-family: arial, helvetica, sans-serif; font-size: 14px;">房屋买卖代理收费，按成交价格总额的0.5—2.5%计收。</span>
</p>
<p style="margin-top: 0px;margin-bottom: 0px;padding: 0px;border: 0px;outline: 0px;vertical-align: baseline;font-family: HiraginoGB3, 微软雅黑, 冬青黑体简体中文, Arial, Helvetica, sans-serif;font-size: medium;white-space: normal;background-color: rgb(255, 255, 255)">
<span style="font-family: arial, helvetica, sans-serif; font-size: 14px;">实行独家代理的，收费标准由委托方与房地产中介机构协商，可适当提高，但最高不超过成交价格的3%。</span>
</p>
<p style="margin-top: 0px;margin-bottom: 0px;padding: 0px;border: 0px;outline: 0px;vertical-align: baseline;font-family: HiraginoGB3, 微软雅黑, 冬青黑体简体中文, Arial, Helvetica, sans-serif;font-size: medium;white-space: normal;background-color: rgb(255, 255, 255)">
<span style="font-family: arial, helvetica, sans-serif; font-size: 14px;">土地使用权转让代理收费办法和标准另行规定。</span>
</p>
<p style="margin-top: 0px;margin-bottom: 0px;padding: 0px;border: 0px;outline: 0px;vertical-align: baseline;font-family: HiraginoGB3, 微软雅黑, 冬青黑体简体中文, Arial, Helvetica, sans-serif;font-size: medium;white-space: normal;background-color: rgb(255, 255, 255)">
<span style="font-family: arial, helvetica, sans-serif; font-size: 14px;">房地产经纪费由房地产经纪机构向委托人收取。</span>
</p>
<p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; border: 0px; outline: 0px; vertical-align: baseline; font-family: HiraginoGB3, 微软雅黑, 冬青黑体简体中文, Arial, Helvetica, sans-serif; font-size: medium; white-space: normal; background-color: rgb(255, 255, 255); text-align: left;">
<span style="font-family: arial, helvetica, sans-serif; font-size: 14px;">七、上述规定的房地产价格评估、房地产经纪收费为最高限标准。各省、自治区、直辖市物价、房地产行政主管部门可依据本通知制定当地具体执行的收费标准，报国家计委、建设部备案。对经济特区的收费标准可适当规定高一些，但最高不得超过上述收费标准的30%。</span>
</p>
<p style="margin-top: 0px;margin-bottom: 0px;padding: 0px;border: 0px;outline: 0px;vertical-align: baseline;font-family: HiraginoGB3, 微软雅黑, 冬青黑体简体中文, Arial, Helvetica, sans-serif;font-size: medium;white-space: normal;background-color: rgb(255, 255, 255)">
<span style="font-family: arial, helvetica, sans-serif; font-size: 14px;">八、各地区、各部门和房地产中介服务机构应严格执行物价部门规定的收费原则和收费标准，切实提供质价相称的服务。</span>
</p>
<p style="margin-top: 0px;margin-bottom: 0px;padding: 0px;border: 0px;outline: 0px;vertical-align: baseline;font-family: HiraginoGB3, 微软雅黑, 冬青黑体简体中文, Arial, Helvetica, sans-serif;font-size: medium;white-space: normal;background-color: rgb(255, 255, 255)">
<span style="font-family: arial, helvetica, sans-serif; font-size: 14px;">凡中介服务机构资格应经确认而未经确认、自立名目乱收费、擅自提高收费标准或越权制定、调整收费标准的，属于价格违法行为，由物价检查机构按有关法规予以处罚。</span>
</p>
<p style="margin-top: 0px; margin-bottom: 0px; padding: 0px; border: 0px; outline: 0px; vertical-align: baseline; font-family: HiraginoGB3, 微软雅黑, 冬青黑体简体中文, Arial, Helvetica, sans-serif; font-size: medium; white-space: normal; background-color: rgb(255, 255, 255);">
<span style="font-family: arial, helvetica, sans-serif; font-size: 14px;">九、本通知下达以前有关规定凡与本通知相抵触的，一律以本通知为准。</span>
</p>`