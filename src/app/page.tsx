'use client';

import Image from 'next/image';
import Link from 'next/link';
import '@/app/globals.scss';
import style from '@/app/_styles/index.module.scss';
import BtnAera from '@/app/_components/BtnArea';

export default function Home() {
  return (
    <>
      <div className={style.fv}>
        <div className={style.fvInner}>
          <div className={style.fvText}>
            <Image src="/images/fv_logo.png" alt="" width={516} height={107}/>
            <strong>勉強時間とナレッジを一元管理</strong>
            <p>
            エンジニアの勉強時間とナレッジの記録に特化したアプリ勉強時間やコードの記録を記録して、勉強のモチベーションをナレッジを記録して、知識をメモしよう。
            </p>
            <div className={style.btnArea}>
              <Link href="/login" className={style.login}>
                ログイン
              </Link>
              <Link href="/signup" className={style.new}>
                新規登録
              </Link>
              <Link href="/" className={style.test}>
                テストユーザー
              </Link>
          </div>
          </div>
          <div className={style.fvImg}>
            <Image src="/images/fv_img.png" alt="" width={401} height={431} />
          </div>
        </div>
      </div>

      <section className={`${style.oneLank}, ${style.card}`}>
        <div>{/* wrapper--800 */}
          <h2>{/* mb-[80px] */}
            日々のナレッジを蓄積して、<br/>ワンランク上のエンジニアに。
          </h2>
          <div className={style.flexBox}>{/* mb-[100px] */}
              <div className={style.img}>
              <Image src="/images/index_img01.png" alt="" width={476} height={358} />
              </div>
              <div  className={style.text}>
                <p>{/* mb-5 */}
                  本サービスはエンジニア特化型のナレッジ蓄積＆勉強記録サービスです。
                </p>
                <p>{/* mb-5 */}
                  新たなプログラム言語の習得や日々のナレッジを蓄積をし、自身のスキルのメモ機能としてお使いいただけます。
                </p>
                <p>
                  新たなプログラム言語の習得や日々のナレッジを蓄積をし、自身のスキルのメモ機能としてお使いいただけます。
                </p>
              </div>
          </div>
          <BtnAera/>
        </div>
      </section>
      
      <section className={style.about}>{/* card */}
        <div>{/* wrapper--1000 */}
          <h2>ABOUT</h2>
          <span>本サービスについて</span>{/* mb-[60px] */}
          <div className={style.flexBox}>{/* mb-[100px] */}
            <div className={style.box}>
              <Image src="/images/index_img02.png" alt="ポイント1" width={244} height={187} className={style.point1}/>
              <h3>勉強時間の管理に</h3>
              <p>
              日々の勉強時間を簡単に記録することが可能！<br/>
              資格取得やプログラミング言語習得へのモチベーション維持に。
              </p>
            </div>
            <div className={style.box}>
              <Image src="/images/index_img03.png" alt="ポイント2" width={258} height={188} className={style.point2}/>
              <h3>ナレッジ蓄積メモに</h3>
              <p>
              仕事で得た知識や、調べて分かったコードなど、忘れないようにメモとして残すことが可能。<br/>
              自分のオリジナル辞書のように活用することも。
              </p>
            </div>
            <div className={style.box}>
              <Image src="/images/index_img04.png" alt="ポイント3" width={256} height={188} className={style.point3}/>
              <h3>Todoリストとしての活用</h3>
              <p>
              その日のタスク管理や、勉強でわからない点などをタグで管理。<br/>
              タスクや疑問点を整理することが可能に。
              </p>
            </div>
          </div>
          <BtnAera/>
        </div>
      </section>
    </>
  );
}
