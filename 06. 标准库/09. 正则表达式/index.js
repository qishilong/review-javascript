// 1. 写一个正则表达式，匹配手机号  11位，第一位是1
// const reg = /^[1][0-9]{10}$/

// 2. 姓名必须是3-6位的中文
// const reg1 = /^[\u4e00-\u9FA5]{3,6}$/

// 3. 密码必须是6 - 12位的字符，只能包含数字、字母、下划线
// const reg2 = /^([A-Z0-9a-z_]){6,12}$/
// const reg2 = /^\w{6,12}$/

// 4. 写一个正则表达式，匹配邮箱    xxxxxx @xxxxx.xxxx.xxxx
// const reg3 = /^\w+@\w+(\.\w+){1,2}$/

// 5. 匹配一个座机号    xxx-xxxxxxxx    前面：1-3个数字 后面：4 - 8个数字
// const reg4 = /^\d{1,3}-\d{4,8}$/

// 6. 匹配一个正数
// const reg5 = /^\d+(\.\d+)?$/

// 7. 匹配一个小数
// const reg6 = /^(-?[1-9]+|0)\.\d+$/

// 8. 匹配一个整数
// const reg7 = /^-?\d+(\.0+)?$/

// 9. 书写一个正则表达式，去匹配一个字符串，得到匹配的次数，和匹配的结果
// const str = "aababddababab"

// const reg = /ab/g;
// let n = 0;
// while (result = reg.exec(str)) {
//     n++
//     console.log(result);
// }
// console.log(n)

// const str = "1234fadfa13232", reg = /\d+/g;
// let n = 0;
// while (result = reg.exec(str)) {
//     n++;
//     console.log(result[0])
// }
// console.log(n)

// 判断匹配多少处
// let n = 0;
// const str = "123fasfadsew121fsd11", reg = /\d+/g
// while (reg.test(str)) {
//     n++;
// }
// console.log(n)

// 10. 得到一个字符串中中文字符的数量
// const str = "1231中文中文1234", reg = /[\u4e00-\u9FA5]/g;
// const result = str.match(reg);
// console.log(result.length)

// 11. 过滤敏感词，有一个敏感词数组，需要将字符串中出现的敏感词替换为四个星号   `["too young too simple", "营销"]`

// const arr = ["色情", "暴力", "宣传", "造谣"];
// const remove = (origin, replace) => {
//     const reg = new RegExp(`(${arr.join("|")})+`, "g")
//     return origin.replace(reg, replace)
// }
// const result = remove("这是一个充满色情，暴力，造谣的世界.", "****")
// console.log(result)

// 12.  得到一个html字符串中出现的章节数量
const html = `
<h2>第1章</h2>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi recusandae mollitia labore dolor a repudiandae rem officia culpa. Ipsum corporis vero blanditiis nam recusandae mollitia consectetur, illo fugit placeat numquam!</p>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam aliquam nobis commodi voluptas at ex, dolor eum tempora harum saepe itaque quae explicabo sint repudiandae molestiae incidunt quidem? Voluptatem, incidunt?</p>
    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error, doloribus aliquid nobis explicabo assumenda ratione minima accusamus dignissimos perferendis in earum recusandae! Facere quas, explicabo facilis doloribus aperiam culpa esse!</p>
    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur adipisci officiis voluptate deleniti cum modi provident error, quas aspernatur fuga quae quam eius facere voluptatibus accusamus ullam perspiciatis rerum harum.</p>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus ullam perspiciatis vero sunt enim ipsum, repellendus nesciunt, velit consequuntur illum veniam ea adipisci, saepe id at? Optio maiores est quam?</p>
    <h2>第2章</h2>
    <p>Sequi ex sed, consequatur eos incidunt, quasi tempora facilis aliquam harum, nemo aliquid minima? Possimus facilis, laborum ut reprehenderit aliquam, libero illo, cumque eum quos perferendis explicabo ratione blanditiis! Inventore?</p>
    <p>Quasi, minima quam tempora magnam rerum, incidunt inventore ipsa ut impedit blanditiis temporibus esse sint fuga a necessitatibus eligendi sapiente non vitae quod iusto obcaecati? Similique numquam illo temporibus quis.</p>
    <p>Maiores, fuga vel eum neque repellendus illo quidem culpa possimus earum quisquam, voluptatum quam sapiente libero quas, odio commodi optio? Nostrum laboriosam natus vitae in aspernatur sequi ab ipsum ipsam.</p>
    <p>Dolor accusantium enim ipsum, similique atque numquam. Nemo excepturi, similique aperiam enim labore soluta animi, suscipit ad quibusdam hic molestias culpa natus nobis repudiandae velit numquam illum itaque magni. Doloremque.</p>
    <p>Quis odit iste, beatae dolor commodi voluptatem rem maiores officiis atque accusantium consectetur magni. Sed tempora ipsum provident vel, fugit modi laborum quaerat nisi sit adipisci quidem debitis dolor vero.</p>
    <h2>第3章</h2>
    <p>Modi cumque ipsum veritatis quis ratione doloremque facilis iusto officiis labore odio velit pariatur quidem, iste, fuga aut amet quisquam dolorum eveniet ex nulla? Ut eaque officiis labore distinctio a!</p>
    <p>Iste dolores ducimus sapiente rem, sed nesciunt nulla voluptatum quos labore cum modi eius at enim, ipsum repellat deserunt eaque, necessitatibus doloremque sint fugiat explicabo quaerat nisi perspiciatis. Sapiente, optio.</p>
    <p>Eaque in quae culpa minima possimus atque consequuntur, ducimus unde! Consectetur, labore nihil! Laboriosam perspiciatis provident, dolor suscipit fugit repudiandae hic nemo dolorum sit, nesciunt recusandae cupiditate. Dicta, repellat corrupti.</p>
    <p>Vitae, blanditiis! Molestiae soluta at saepe nemo atque vero earum, magnam ducimus laudantium deleniti facere reiciendis commodi excepturi quisquam quibusdam. Officiis commodi nisi omnis ipsa repellendus earum eius deleniti sint.</p>
    <p>Dignissimos, aliquam alias laboriosam beatae enim veritatis omnis ex autem fugit ratione. Eligendi nostrum id, adipisci maiores, aperiam alias tempore fugit natus cupiditate similique ipsam iure necessitatibus. Accusantium, vitae sapiente.</p>
    <h2>第4章</h2>
    <p>Facilis sit possimus debitis nesciunt veritatis sunt labore eveniet architecto numquam, quae perferendis corporis omnis ipsa nemo id similique vitae voluptas quis ut corrupti incidunt temporibus quam! Blanditiis, deleniti voluptatibus.</p>
    <p>Esse ad necessitatibus cumque fuga nisi a vitae dolor? Corrupti harum adipisci officiis vitae accusamus, facilis dicta deserunt amet. Error unde, magnam sed provident harum architecto omnis officia voluptatibus aliquid.</p>
    <p>Dicta quo nesciunt aspernatur consequatur magni explicabo dolorum laborum dolorem, consequuntur itaque ratione ad atque perferendis eaque vitae amet enim non reprehenderit autem sint minima! Quibusdam vitae corrupti iure quia.</p>
    <p>Fuga nisi cum possimus repudiandae consectetur saepe fugit dolorum a expedita provident sequi sed in optio assumenda, asperiores voluptatem voluptates veniam repellendus id error nam atque earum. Ipsa, saepe earum.</p>
    <p>Aliquid laboriosam totam molestiae dicta dignissimos nostrum molestias quaerat, vel, alias quae nulla, voluptate est facilis quas! Perferendis, repellat perspiciatis nesciunt fuga porro non? Non labore maiores asperiores architecto ad!</p>
    <h2>第5章</h2>
    <p>Itaque dignissimos id nesciunt animi ipsam, repellendus earum possimus, voluptas vitae provident tempora reiciendis delectus ratione dolorum. Expedita laudantium sed magni dignissimos aliquam quo maiores reiciendis, repellendus quaerat debitis facilis.</p>
    <p>Repellendus magni vel dignissimos, similique consequatur consectetur, deleniti est quia odio quisquam eveniet eius culpa quae doloremque reiciendis. Dicta magni qui reprehenderit praesentium consequatur placeat laborum sunt autem quam hic.</p>
    <p>Perspiciatis sit quisquam expedita excepturi minima eum suscipit odio eveniet velit similique facilis laborum doloribus cupiditate, incidunt consequuntur ratione nam commodi quaerat? Impedit, totam reiciendis vero rem dicta provident quaerat!</p>
    <p>Beatae id facilis corrupti a ipsam? Laborum quis eveniet rerum placeat unde aliquam nam recusandae labore quibusdam officiis blanditiis magni ab, non enim maxime, ad error sapiente. Aut, perferendis soluta.</p>
    <p>Nulla, esse corrupti! Labore repellat aspernatur, quisquam, saepe minus alias tempora debitis aut reiciendis optio id dolor provident soluta perferendis. Doloribus dolor nisi nam modi vel qui aspernatur voluptatibus eos.</p>
    <h2>第6章</h2>
    <p>Voluptatem magni ab iusto amet fuga illum dolor, iste suscipit, natus molestias cum, rem beatae animi maxime doloribus vitae non praesentium. Provident, accusantium fuga iste tempore vel molestias quasi dolor?</p>
    <p>Impedit consequuntur quisquam voluptates iure nemo fugit veniam perspiciatis adipisci laboriosam reprehenderit quod pariatur molestiae, illum earum recusandae iusto nam aperiam fugiat? Voluptatem nihil temporibus eum vitae, nesciunt debitis ipsum.</p>
    <p>Eveniet tempora, delectus minima atque ratione eligendi, distinctio earum id animi reprehenderit itaque suscipit corporis voluptate at! Atque esse, quas dicta facere modi vero quisquam amet illum molestias ipsam nemo.</p>
    <p>Maxime quisquam est dolorem distinctio quos nobis culpa magnam, hic qui reprehenderit officia voluptatem sint quo! Maxime aperiam eligendi, modi doloribus ad, aspernatur voluptates porro perspiciatis amet odit eaque eveniet!</p>
    <p>Tempore aliquid, vero iure, nisi dicta eius in perspiciatis voluptates totam unde rem exercitationem neque omnis porro quibusdam delectus maiores, a eaque! Eveniet, aspernatur libero! Laborum tempora molestiae dolorum commodi!</p>
    <h2>第7章</h2>
    <p>Doloribus nihil quaerat aliquam laborum modi ab itaque accusamus quidem tempora odit reiciendis ipsum, praesentium labore. Tempore, repudiandae quisquam. Tempore rerum ex tenetur a dolore ab aliquid quaerat quod ipsa.</p>
    <p>Esse laboriosam magni libero nobis sunt unde minima nemo et id! Doloribus, vero in blanditiis eveniet voluptatum ad ducimus officiis omnis quisquam possimus libero eligendi tenetur quibusdam impedit, necessitatibus voluptate?</p>
    <p>In, tempora. Sit quasi a, iusto nemo deserunt sunt ab non debitis maiores, molestias modi aspernatur magnam libero qui, fuga velit ullam ex earum soluta recusandae! Repellendus repellat delectus molestias!</p>
    <p>Iste velit maiores, nostrum molestias quisquam, voluptatibus veritatis voluptates totam nisi omnis, vero ullam a nam. Pariatur quia et, temporibus eius qui magni magnam, saepe modi impedit delectus sit? Saepe!</p>
    <p>Magni nisi earum a laborum cumque, omnis hic ipsa nesciunt recusandae ipsum necessitatibus assumenda repudiandae, consequatur sunt ea harum reprehenderit perferendis nulla voluptates iste, velit labore ipsam vitae officiis? Quis.</p>
    <h2>第8章</h2>
    <p>Asperiores hic molestias quos sunt ex quo magni explicabo ipsum quod officiis fuga veritatis quidem dolor, expedita, saepe a itaque veniam porro, dolores amet harum architecto tenetur. Officiis, sit laudantium.</p>
    <p>Ad nesciunt minus asperiores culpa fugiat repellat delectus dolores molestias ipsa cum vitae beatae, unde mollitia aspernatur soluta perferendis quidem dolore odio necessitatibus. Libero ipsam suscipit quaerat quisquam architecto dignissimos.</p>
    <p>Minima ex doloremque eos aspernatur qui? Nobis, reiciendis. Laboriosam error incidunt sequi rerum repellat ex vero reprehenderit dolore necessitatibus earum fuga labore quaerat quia, obcaecati, magni autem impedit et explicabo.</p>
    <p>Expedita modi rem ab. Nemo harum odio, commodi reprehenderit quis eius eveniet nobis iste nihil fuga molestias voluptatem explicabo natus fugiat assumenda deserunt architecto impedit dignissimos, quaerat vel. Expedita, quo!</p>
    <p>Dolorem, aliquam et quos illum sequi molestiae quaerat modi? Magnam unde accusamus itaque nesciunt labore sunt iure animi quisquam possimus repudiandae rerum nostrum fugit autem dolorum, quasi tempora, sed ipsa?</p>
    <h2>第9章</h2>
    <p>Voluptatum error nisi autem voluptatem at odit illum iste! Eius natus exercitationem qui? Provident corrupti accusantium enim quidem minima perspiciatis voluptatem autem ducimus, consequatur officia optio dolorem quis doloribus possimus!</p>
    <p>Excepturi neque libero rerum, obcaecati voluptates repudiandae blanditiis cumque eos commodi magni, quisquam tenetur saepe officia temporibus! Aspernatur, corrupti omnis magnam molestias eveniet velit, aut, atque fuga voluptatibus quasi excepturi!</p>
    <p>Quae dolor adipisci molestias accusamus assumenda consequatur voluptatibus consequuntur aperiam quis perferendis recusandae culpa aspernatur esse nemo labore minima est eos neque suscipit vitae repudiandae, voluptates deserunt? Minus, officia cumque.</p>
    <p>Harum deserunt soluta amet odit facilis itaque iste provident! Temporibus consequatur accusamus rerum sit iusto atque eaque facilis, recusandae sequi commodi cumque odit molestias sed necessitatibus id est exercitationem quidem.</p>
    <p>Provident est, natus eos eligendi incidunt quas adipisci cum accusamus quia asperiores possimus ab nesciunt dolor. Qui, autem a velit aliquid quasi fugit corrupti in iusto corporis provident iste voluptatum!</p>
    <h2>第10章</h2>
    <p>Esse aperiam id possimus repellendus dignissimos sint voluptates. Deleniti eum excepturi facere explicabo sapiente iste voluptas laborum, incidunt aspernatur, voluptatum reprehenderit similique odit nam adipisci! Dolorem impedit minus optio provident.</p>
    <p>Facere deserunt soluta neque temporibus cupiditate repellat quidem veniam, ipsam debitis, excepturi dolores unde, libero alias earum nemo aliquam. Officia repellendus, commodi illum ea voluptate animi consequuntur. Consectetur, similique asperiores.</p>
    <p>Vitae nostrum magni nam pariatur voluptatibus! Dignissimos quia delectus temporibus incidunt molestias vitae commodi quis ipsam reprehenderit corporis doloribus recusandae excepturi dolorum atque, architecto iste mollitia ea nemo asperiores natus.</p>
    <p>Provident ipsum rem accusamus nam, debitis explicabo sint perferendis? Ad, voluptatem possimus aspernatur expedita alias laudantium libero vero distinctio ea itaque quaerat officia reiciendis obcaecati incidunt, asperiores esse iusto debitis.</p>
    <p>Sunt nihil, aliquid ducimus aperiam placeat eveniet officia asperiores repudiandae beatae quae. A esse, dolore commodi et fugit distinctio ipsum perferendis, consectetur culpa illo nulla eius adipisci repellat laudantium quasi?</p>
`;

const reg = /<h2>第\d+章<\/h2>/g
let n = 0;
while (reg.test(html)) {
    n++
}
console.log(n)