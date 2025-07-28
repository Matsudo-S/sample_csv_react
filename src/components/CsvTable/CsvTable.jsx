import React, { useState, useEffect } from 'react';
import './CsvTable.css';

const CsvTable = () => {
  // CSVデータを格納するstate（元のデータ）
  const [originalCsvData, setOriginalCsvData] = useState([]);
  // フィルタリング・ソート後のCSVデータを格納するstate
  const [csvData, setCsvData] = useState([]);
  // ヘッダー（列名）を格納するstate
  const [headers, setHeaders] = useState([]);
  // ローディング状態を管理するstate
  const [loading, setLoading] = useState(true);
  // エラー状態を管理するstate
  const [error, setError] = useState(null);
  
  // 検索キーワードを管理するstate
  const [searchKeyword, setSearchKeyword] = useState('');
  // 現在のソート項目を管理するstate
  const [sortField, setSortField] = useState('');
  // ソート順を管理するstate（true: 降順, false: 昇順）
  const [sortDirection, setSortDirection] = useState(false);

  useEffect(() => {
    // コンポーネントがマウントされた時にCSVファイルを読み込む
    loadCsvFile();
  }, []);

  // 検索キーワードまたはソート設定が変更された時にデータを再フィルタリング・ソート
  useEffect(() => {
    filterAndSortData();
  }, [searchKeyword, sortField, sortDirection, originalCsvData]);

  // CSVファイルを読み込む関数
  const loadCsvFile = async () => {
    try {
      // ローディング状態をtrueに設定
      setLoading(true);
      
      // publicフォルダ内のCSVファイルをfetchで取得
      // 注意: publicフォルダ内のファイルは相対パスでアクセス可能
      const response = await fetch('/sample.csv');
      
      // レスポンスが正常でない場合はエラーを投げる
      if (!response.ok) {
        throw new Error('CSVファイルの読み込みに失敗しました');
      }
      
      // レスポンスをテキストとして取得
      const csvText = await response.text();
      
      // CSVテキストをパースしてデータに変換
      const parsedData = parseCsv(csvText);
      
      // 元のデータと表示用データを設定
      setOriginalCsvData(parsedData.rows);
      setCsvData(parsedData.rows);
      setHeaders(parsedData.headers);
      
    } catch (err) {
      // エラーが発生した場合はエラーメッセージを設定
      setError(err.message);
    } finally {
      // 処理完了後、ローディング状態をfalseに設定
      setLoading(false);
    }
  };

  // CSVテキストをパースする関数
  const parseCsv = (csvText) => {
    // 改行で行を分割
    const lines = csvText.split('\n');
    
    // 空行を除去
    const nonEmptyLines = lines.filter(line => line.trim() !== '');
    
    if (nonEmptyLines.length === 0) {
      throw new Error('CSVファイルが空です');
    }
    
    // 最初の行をヘッダーとして取得
    const headers = nonEmptyLines[0].split(',').map(header => header.trim());
    
    // 2行目以降をデータ行として処理
    const rows = nonEmptyLines.slice(1).map((line, index) => {
      // カンマで列を分割
      const values = line.split(',').map(value => value.trim());
      
      // ヘッダーと値を組み合わせてオブジェクトを作成
      const rowObject = {};
      headers.forEach((header, i) => {
        rowObject[header] = values[i] || '';
      });
      
      return rowObject;
    });
    
    return { headers, rows };
  };

  // データのフィルタリングとソートを行う関数
  const filterAndSortData = () => {
    let filteredData = [...originalCsvData];

    // 検索キーワードでフィルタリング
    if (searchKeyword.trim() !== '') {
      filteredData = filteredData.filter(row => {
        // 全ての列の値をチェックして、検索キーワードが含まれているか確認
        return Object.values(row).some(value => 
          value.toString().toLowerCase().includes(searchKeyword.toLowerCase())
        );
      });
    }

    // ソート項目が指定されている場合はソートを実行
    if (sortField) {
      filteredData.sort((a, b) => {
        const valueA = a[sortField];
        const valueB = b[sortField];
        
        // 数値の場合は数値として比較
        if (!isNaN(valueA) && !isNaN(valueB)) {
          return sortDirection ? 
            parseFloat(valueB) - parseFloat(valueA) : 
            parseFloat(valueA) - parseFloat(valueB);
        }
        
        // 文字列の場合は文字列として比較
        const comparison = valueA.localeCompare(valueB, 'ja');
        return sortDirection ? -comparison : comparison;
      });
    }

    // フィルタリング・ソート後のデータを設定
    setCsvData(filteredData);
  };

  // ソートボタンがクリックされた時の処理
  const handleSort = (field) => {
    if (sortField === field) {
      // 同じ項目がクリックされた場合はソート順を反転
      setSortDirection(!sortDirection);
    } else {
      // 新しい項目がクリックされた場合は昇順でソート
      setSortField(field);
      setSortDirection(false);
    }
  };

  // 検索キーワードが変更された時の処理
  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  // ローディング中の表示
  if (loading) {
    return <div className="csv-loading">CSVファイルを読み込み中...</div>;
  }

  // エラー時の表示
  if (error) {
    return <div className="csv-error">エラー: {error}</div>;
  }

  // データがない場合の表示
  if (originalCsvData.length === 0) {
    return <div className="csv-no-data">データが見つかりません</div>;
  }

  return (
    <div className="csv-table-container">
      <h2>CSVデータ表示</h2>
      
      {/* 検索ボックス */}
      <div className="csv-search-container">
        <input
          type="text"
          placeholder="検索キーワードを入力してください..."
          value={searchKeyword}
          onChange={handleSearchChange}
          className="csv-search-input"
        />
        <div className="csv-search-info">
          検索結果: {csvData.length}件 / 全{originalCsvData.length}件
        </div>
      </div>
      
      {/* テーブル形式でデータを表示 */}
      <table className="csv-table">
        <thead>
          <tr>
            {/* ヘッダー行を動的に生成（ソートボタン付き） */}
            {headers.map((header, index) => (
              <th key={index}>
                <div className="header-content">
                  <span>{header}</span>
                  {/* ソートボタン */}
                  <button
                    className={`sort-button ${sortField === header ? 'active' : ''}`}
                    onClick={() => handleSort(header)}
                    title={`${header}でソート`}
                    data-tooltip={sortField === header ? 
                      (sortDirection ? '降順' : '昇順') : 
                      'ソート'
                    }
                  >
                    {sortField === header ? 
                      (sortDirection ? '▼' : '▲') : 
                      '↕'
                    }
                  </button>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* データ行を動的に生成 */}
          {csvData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {/* 各行の各列の値を表示 */}
              {headers.map((header, colIndex) => (
                <td key={colIndex}>{row[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* データ件数の表示 */}
      <div className="csv-info">
        総件数: {csvData.length}件
        {searchKeyword && <span> (検索: "{searchKeyword}")</span>}
        {sortField && <span> (ソート: {sortField} {sortDirection ? '降順' : '昇順'})</span>}
      </div>
    </div>
  );
};

export default CsvTable; 