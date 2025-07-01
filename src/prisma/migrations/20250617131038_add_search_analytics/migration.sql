-- BRANCH 1: Basic Search Database Enhancements
-- Migration script dla dodania search indexes i basic analytics

-- 1. Full-text search indexes dla produktów
-- Kombinujemy title i description w jeden searchable vector
CREATE INDEX IF NOT EXISTS idx_products_fulltext_search 
ON "Product" 
USING gin(to_tsvector('english', 
  COALESCE(title, '') || ' ' || COALESCE(description, '')
));

-- 2. Dodatkowe indexes dla performance search queries
-- Index dla category filtering w search
CREATE INDEX IF NOT EXISTS idx_product_categories_search 
ON "ProductToCategory" (categoryType, productId);

-- Index dla subcategory filtering w search
CREATE INDEX IF NOT EXISTS idx_product_subcategories_search 
ON "ProductToSubcategory" (subcategoryId, productId);

-- Index dla tag filtering w search (już może istnieć)
CREATE INDEX IF NOT EXISTS idx_product_tags_search 
ON "ProductToTag" (tagId, productId);

-- 3. Search performance indexes
-- Index dla sortowania po created date (newest first)
CREATE INDEX IF NOT EXISTS idx_products_created_desc 
ON "Product" (createdAt DESC);

-- Index dla sortowania po price
CREATE INDEX IF NOT EXISTS idx_products_price_asc 
ON "Product" (price ASC);
CREATE INDEX IF NOT EXISTS idx_products_price_desc 
ON "Product" (price DESC);

-- 4. Basic search analytics table (simplified for Branch 1)
CREATE TABLE IF NOT EXISTS "SearchAnalytics" (
  id SERIAL PRIMARY KEY,
  query TEXT NOT NULL,                    -- What user searched for
  result_count INTEGER DEFAULT 0,         -- How many results returned
  user_id TEXT,                          -- User ID if logged in (optional)
  search_context TEXT DEFAULT 'unknown', -- Where search happened
  created_at TIMESTAMP DEFAULT NOW()
);

-- Index dla analytics queries
CREATE INDEX IF NOT EXISTS idx_search_analytics_query 
ON "SearchAnalytics" (query);

CREATE INDEX IF NOT EXISTS idx_search_analytics_created 
ON "SearchAnalytics" (created_at DESC);

-- 5. View dla popular searches (dla późniejszych branches)
-- W Branch 1 nie używamy, ale przygotowujemy
CREATE OR REPLACE VIEW popular_searches AS
SELECT 
  query,
  COUNT(*) as search_count,
  AVG(result_count) as avg_results,
  MAX(created_at) as last_searched
FROM "SearchAnalytics" 
WHERE created_at >= NOW() - INTERVAL '7 days'
  AND query IS NOT NULL 
  AND LENGTH(query) >= 2
GROUP BY query
HAVING COUNT(*) >= 2  -- At least 2 searches to be "popular"
ORDER BY search_count DESC, last_searched DESC
LIMIT 100;