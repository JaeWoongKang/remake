-- 시드 파일 예시 (seed.sql)

-- 카테고리 데이터 삽입
INSERT INTO categories (name, description)
VALUES 
  ('개발', '개발 관련 제품 및 서비스'),
  ('디자인', '디자인 관련 제품 및 서비스'),
  ('마케팅', '마케팅 관련 제품 및 서비스'),
  ('생산성', '생산성 향상 도구'),
  ('AI', '인공지능 관련 제품');

-- 제품 데이터 삽입
INSERT INTO products (name, description, how_it_works, tagline, icon, url, profile_id, category_id)
VALUES 
  ('코드메이트', '개발자를 위한 AI 코딩 도우미', '자연어 처리를 통해 코드 작성을 도와줍니다', '코딩이 더 쉬워집니다', 'https://example.com/icon1.png', 'https://codemate.app', '94cd0e78-39b0-4fe2-a2ca-a8eb656ff07b', 1),
  ('디자인허브', '디자이너를 위한 협업 도구', '실시간 협업 기능을 제공합니다', '함께 디자인하세요', 'https://example.com/icon2.png', 'https://designhub.app', '94cd0e78-39b0-4fe2-a2ca-a8eb656ff07b', 2),
  ('마켓인사이트', '마케팅 데이터 분석 도구', '고객 데이터를 분석하여 인사이트를 제공합니다', '데이터로 마케팅하세요', 'https://example.com/icon3.png', 'https://marketinsight.app', '94cd0e78-39b0-4fe2-a2ca-a8eb656ff07b', 3),
  ('타임블록', '시간 관리 앱', '포모도로 기법을 활용한 시간 관리', '시간을 효율적으로 사용하세요', 'https://example.com/icon4.png', 'https://timeblock.app', '94cd0e78-39b0-4fe2-a2ca-a8eb656ff07b', 4),
  ('AI 어시스턴트', '개인 AI 비서', '일정 관리, 이메일 작성 등을 도와줍니다', '당신만의 AI 비서', 'https://example.com/icon5.png', 'https://aiassistant.app', '94cd0e78-39b0-4fe2-a2ca-a8eb656ff07b', 5);

-- 제품 추천 데이터 삽입 (복합 기본 키)
INSERT INTO product_upvotes (product_id, profile_id)
VALUES (1, '94cd0e78-39b0-4fe2-a2ca-a8eb656ff07b');

-- 리뷰 데이터 삽입
INSERT INTO reviews (product_id, profile_id, rating, review)
VALUES 
  (1, '94cd0e78-39b0-4fe2-a2ca-a8eb656ff07b', 5, '정말 유용한 도구입니다!'),
  (2, '94cd0e78-39b0-4fe2-a2ca-a8eb656ff07b', 4, '좋은 기능이 많지만 UI가 조금 개선되면 좋겠어요'),
  (3, '94cd0e78-39b0-4fe2-a2ca-a8eb656ff07b', 5, '마케팅 전략 수립에 큰 도움이 됩니다'),
  (4, '94cd0e78-39b0-4fe2-a2ca-a8eb656ff07b', 3, '기본 기능은 좋지만 추가 기능이 필요해요'),
  (5, '94cd0e78-39b0-4fe2-a2ca-a8eb656ff07b', 5, 'AI의 정확도가 놀랍습니다');

-- 토픽 데이터 삽입
INSERT INTO topics (name, slug)
VALUES 
  ('개발 이야기', 'dev-talk'),
  ('디자인 트렌드', 'design-trends'),
  ('마케팅 전략', 'marketing-strategy'),
  ('생산성 향상 팁', 'productivity-tips'),
  ('AI 기술 동향', 'ai-trends');

-- 게시물 데이터 삽입
INSERT INTO posts (title, content, topic_id, profile_id)
VALUES 
  ('React 18의 새로운 기능', 'React 18에서는 다양한 새로운 기능이 추가되었습니다...', 1, '94cd0e78-39b0-4fe2-a2ca-a8eb656ff07b'),
  ('2023 디자인 트렌드', '올해의 디자인 트렌드는 미니멀리즘과 뉴모피즘이 주목받고 있습니다...', 2, '94cd0e78-39b0-4fe2-a2ca-a8eb656ff07b'),
  ('효과적인 SNS 마케팅 방법', 'SNS 마케팅을 효과적으로 하기 위한 방법을 소개합니다...', 3, '94cd0e78-39b0-4fe2-a2ca-a8eb656ff07b'),
  ('포모도로 기법으로 생산성 높이기', '25분 집중, 5분 휴식의 포모도로 기법으로 생산성을 높여보세요...', 4, '94cd0e78-39b0-4fe2-a2ca-a8eb656ff07b'),
  ('생성형 AI의 발전과 미래', '생성형 AI 기술의 최근 발전과 미래 전망에 대해 알아봅니다...', 5, '94cd0e78-39b0-4fe2-a2ca-a8eb656ff07b');

-- 게시물 추천 데이터 삽입 (복합 기본 키)
INSERT INTO post_upvotes (post_id, profile_id)
VALUES (1, '94cd0e78-39b0-4fe2-a2ca-a8eb656ff07b');

-- 게시물 답글 데이터 삽입
INSERT INTO post_replies (reply, post_id, profile_id)
VALUES 
  ('정말 유익한 글이네요!', 1, '94cd0e78-39b0-4fe2-a2ca-a8eb656ff07b'),
  ('저도 이 트렌드에 관심이 많습니다', 2, '94cd0e78-39b0-4fe2-a2ca-a8eb656ff07b'),
  ('SNS 마케팅 팁 감사합니다', 3, '94cd0e78-39b0-4fe2-a2ca-a8eb656ff07b'),
  ('포모도로 기법 실천 중입니다', 4, '94cd0e78-39b0-4fe2-a2ca-a8eb656ff07b'),
  ('AI의 발전 속도가 놀랍네요', 5, '94cd0e78-39b0-4fe2-a2ca-a8eb656ff07b');

-- GPT 아이디어 데이터 삽입
INSERT INTO gpt_ideas (idea, views, claimed_by)
VALUES 
  ('AI 기반 개인 맞춤형 학습 플랫폼', 10, '94cd0e78-39b0-4fe2-a2ca-a8eb656ff07b'),
  ('음성 인식 기반 건강 모니터링 앱', 15, NULL),
  ('AR을 활용한 가구 배치 시뮬레이션', 8, NULL),
  ('블록체인 기반 디지털 자산 관리 도구', 12, NULL),
  ('AI 작곡가 - 감정 기반 음악 생성 앱', 20, NULL);

-- GPT 아이디어 좋아요 데이터 삽입 (복합 기본 키)
INSERT INTO gpt_ideas_likes (gpt_idea_id, profile_id)
VALUES (1, '94cd0e78-39b0-4fe2-a2ca-a8eb656ff07b');

-- 팀 데이터 삽입
INSERT INTO teams (product_name, team_size, equity_split, roles, product_description, description, product_stage)
VALUES 
  ('코드메이트', 3, 33, '개발자, 디자이너, 마케터', 'AI 기반 코딩 도우미', '열정적인 팀원들과 함께 개발자들의 생산성을 높이는 도구를 만들고 있습니다', 'mvp'),
  ('디자인허브', 2, 50, '개발자, 디자이너', '디자이너를 위한 협업 도구', '디자이너들의 협업을 돕는 플랫폼을 개발 중입니다', 'prototype'),
  ('마켓인사이트', 4, 25, '개발자, 데이터 과학자, 마케터, 영업', '마케팅 데이터 분석 도구', '데이터 기반 마케팅 의사결정을 돕는 도구를 개발하고 있습니다', 'product'),
  ('타임블록', 2, 50, '개발자, 디자이너', '시간 관리 앱', '효율적인 시간 관리를 위한 앱을 개발 중입니다', 'mvp'),
  ('AI 어시스턴트', 3, 33, '개발자, AI 전문가, 마케터', '개인 AI 비서', '일상 업무를 도와주는 AI 비서 앱을 개발하고 있습니다', 'idea');

-- 채용 정보 데이터 삽입
INSERT INTO jobs (position, overview, responsibilities, qualifications, benefits, skills, company_name, company_url, company_logo, company_location, apply_url, job_type, job_location, salary_range)
VALUES 
  ('프론트엔드 개발자', '우리 팀과 함께 혁신적인 웹 애플리케이션을 개발할 프론트엔드 개발자를 찾습니다', '사용자 인터페이스 개발, 코드 최적화', 'React 경험 3년 이상', '유연한 근무 시간, 원격 근무 가능', 'React, TypeScript, CSS', '테크스타트', 'https://techstart.com', 'https://example.com/logo1.png', '서울', 'https://techstart.com/apply', 'full-time', 'remote', '$70,000 - $100,000'),
  ('백엔드 개발자', '확장 가능한 서버 아키텍처를 설계할 백엔드 개발자를 모집합니다', 'API 개발, 데이터베이스 설계', 'Node.js 경험 2년 이상', '스톡 옵션, 건강 보험', 'Node.js, PostgreSQL, AWS', '클라우드테크', 'https://cloudtech.com', 'https://example.com/logo2.png', '부산', 'https://cloudtech.com/apply', 'full-time', 'hybrid', '$100,000 - $120,000'),
  ('UX/UI 디자이너', '사용자 중심 디자인을 창출할 디자이너를 찾습니다', '사용자 인터페이스 디자인, 프로토타입 제작', 'Figma 능숙, 포트폴리오 필수', '교육 지원, 장비 지원', 'Figma, Adobe XD, Sketch', '디자인랩', 'https://designlab.com', 'https://example.com/logo3.png', '서울', 'https://designlab.com/apply', 'full-time', 'in-person', '$50,000 - $70,000'),
  ('데이터 과학자', '데이터를 통해 비즈니스 인사이트를 도출할 데이터 과학자를 모집합니다', '데이터 분석, 머신러닝 모델 개발', 'Python, 통계학 지식 필수', '유연한 근무 환경, 성과 보너스', 'Python, TensorFlow, SQL', '데이터코어', 'https://datacore.com', 'https://example.com/logo4.png', '대전', 'https://datacore.com/apply', 'full-time', 'remote', '$100,000 - $120,000'),
  ('마케팅 매니저', '디지털 마케팅 전략을 수립할 마케팅 매니저를 찾습니다', '마케팅 캠페인 기획, 성과 분석', '디지털 마케팅 경험 3년 이상', '성과 인센티브, 유연 근무', 'Google Analytics, Facebook Ads, SEO', '그로스팀', 'https://growthteam.com', 'https://example.com/logo5.png', '인천', 'https://growthteam.com/apply', 'full-time', 'hybrid', '$70,000 - $100,000');

-- 메시지룸 데이터 삽입
INSERT INTO message_rooms DEFAULT VALUES,
                          DEFAULT VALUES,
                          DEFAULT VALUES,
                          DEFAULT VALUES,
                          DEFAULT VALUES;

-- 메시지룸 멤버 데이터 삽입 (복합 기본 키)
INSERT INTO message_room_members (message_room_id, profile_id)
VALUES (1, '94cd0e78-39b0-4fe2-a2ca-a8eb656ff07b');

-- 메시지 데이터 삽입
INSERT INTO messages (message_room_id, sender_id, content, seen)
VALUES 
  (1, '94cd0e78-39b0-4fe2-a2ca-a8eb656ff07b', '안녕하세요! 프로젝트에 관심 있으신가요?', true),
  (1, '94cd0e78-39b0-4fe2-a2ca-a8eb656ff07b', '함께 협업하면 좋을 것 같아요', false),
  (2, '94cd0e78-39b0-4fe2-a2ca-a8eb656ff07b', '디자인 관련 질문이 있습니다', true),
  (3, '94cd0e78-39b0-4fe2-a2ca-a8eb656ff07b', '마케팅 전략에 대해 의견을 나누고 싶어요', false),
  (4, '94cd0e78-39b0-4fe2-a2ca-a8eb656ff07b', '새 프로젝트 제안서를 보내드립니다', true);

-- 알림 데이터 삽입
INSERT INTO notifications (source_id, product_id, target_id, notification_type)
VALUES 
  ('94cd0e78-39b0-4fe2-a2ca-a8eb656ff07b', 1, '94cd0e78-39b0-4fe2-a2ca-a8eb656ff07b', 'review'),
  ('94cd0e78-39b0-4fe2-a2ca-a8eb656ff07b', 2, '94cd0e78-39b0-4fe2-a2ca-a8eb656ff07b', 'review'),
  ('94cd0e78-39b0-4fe2-a2ca-a8eb656ff07b', NULL, '94cd0e78-39b0-4fe2-a2ca-a8eb656ff07b', 'follow'),
  ('94cd0e78-39b0-4fe2-a2ca-a8eb656ff07b', NULL, '94cd0e78-39b0-4fe2-a2ca-a8eb656ff07b', 'mention'),
  ('94cd0e78-39b0-4fe2-a2ca-a8eb656ff07b', 3, '94cd0e78-39b0-4fe2-a2ca-a8eb656ff07b', 'review');

-- 팔로우 데이터 삽입
INSERT INTO follows (follower_id, following_id)
VALUES 
  ('94cd0e78-39b0-4fe2-a2ca-a8eb656ff07b', '94cd0e78-39b0-4fe2-a2ca-a8eb656ff07b');
