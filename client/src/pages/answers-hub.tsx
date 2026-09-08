import { useEffect } from 'react';
import { AnswerLayout, AnswerCta, Block, syncOpenGraph } from '../components/AnswerLayout';
import { ANSWER_MATERIALS, ASSET_MATERIALS, MaterialCard } from '../components/AnswersIndex';
import { useLanguage } from '../hooks/useLanguage';

const URL = 'https://booster.delivery/answers';

/** Hub for the answer cluster. Two jobs: give a person one entrance to the
 *  depth behind the landing page, and give crawlers a concentrator page so the
 *  cluster is reachable in two hops instead of only from the home page. */
export default function AnswersHubPage() {
  const { t, language } = useLanguage();

  useEffect(() => {
    document.title =
      language === 'ru'
        ? 'Ответы и данные по доставке: GrabFood и GoFood — Delivery Booster'
        : language === 'id'
          ? 'Jawaban dan data soal delivery: GrabFood dan GoFood — Delivery Booster'
          : 'Delivery answers and data: GrabFood and GoFood — Delivery Booster';
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = URL;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (description)
      description.content =
        language === 'ru'
          ? 'Вопросы, которые задают перед тем, как отдать доставку: делегирование аккаунта, реклама, свой менеджер или агентство. Плюс открытые данные по 96 ресторанам и метод целиком.'
          : language === 'id'
            ? 'Pertanyaan yang muncul sebelum menyerahkan pengelolaan delivery: delegasi akun, iklan, manajer internal atau agensi. Plus data terbuka dari 96 restoran dan metode lengkap.'
            : 'The questions people ask before handing delivery over: delegating the account, ads, in-house manager or agency. Plus open data from 96 restaurants and the full method.';
    syncOpenGraph();
  }, [language]);

  const all = [...ANSWER_MATERIALS, ...ASSET_MATERIALS];

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: t('Ответы и данные по доставке', 'Delivery answers and data', 'Jawaban dan data soal delivery'),
    url: URL,
    numberOfItems: all.length,
    itemListElement: all.map((m, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `https://booster.delivery${m.href}`,
      name: t(m.titleRu, m.titleEn, m.titleId),
      description: t(m.gistRu, m.gistEn, m.gistId),
    })),
  };

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: t('Ответы и данные по доставке', 'Delivery answers and data', 'Jawaban dan data soal delivery'),
    url: URL,
    isPartOf: { '@type': 'WebSite', name: 'Delivery Booster', url: 'https://booster.delivery' },
    about: 'GrabFood, GoFood, delivery management, restaurant delivery in Southeast Asia',
  };

  return (
    <AnswerLayout
      h1={t('Вопросы, которые задают перед тем, как отдать доставку',
            'The questions people ask before handing delivery over',
            'Pertanyaan yang muncul sebelum menyerahkan pengelolaan delivery')}
      lead={t(
        'Каждый из этих материалов — разбор одного вопроса целиком, а не абзац на лендинге. Здесь же лежат две вещи, которые в Юго-Восточной Азии не публикует больше никто: нормы рынка по нашим 96 ресторанам и метод, по которому мы работаем, — полностью, включая то, что обычно не показывают.',
        'Each of these is one question worked through in full, not a paragraph on a landing page. Alongside them sit two things nobody else in Southeast Asia publishes: market norms from the 96 restaurants we manage, and the method we work by — in full, including the parts usually kept private.',
        'Setiap materi di sini membahas satu pertanyaan sampai tuntas, bukan sekadar paragraf di landing page. Di sini juga ada dua hal yang tidak dipublikasikan siapa pun di Asia Tenggara: norma pasar dari 96 restoran yang kami kelola, dan metode kerja kami — lengkap, termasuk bagian yang biasanya tidak dibagikan.'
      )}
      schemas={[collectionSchema, itemListSchema]}
    >
      <Block title={t('Открытые данные и метод', 'Open data and the method', 'Data terbuka dan metode')}>
        <div className="grid gap-4 sm:grid-cols-2">
          {ASSET_MATERIALS.map((m) => (
            <MaterialCard key={m.href} m={m} large />
          ))}
        </div>
      </Block>

      <Block title={t('Разбираем подробно', 'Worked through in full', 'Dibahas sampai tuntas')}>
        <div className="grid gap-4 sm:grid-cols-2">
          {ANSWER_MATERIALS.map((m) => (
            <MaterialCard key={m.href} m={m} />
          ))}
        </div>
      </Block>

      <AnswerCta />
    </AnswerLayout>
  );
}
