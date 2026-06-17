<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="UTF-8">

    <meta name="viewport"
        content="width=device-width, initial-scale=1.0">

    <title>
        Skill Checker DB GUI
    </title>

    <style>
        body {
            font-family: sans-serif;
            background: #f5f5f5;
            padding: 40px;
        }

        h1 {
            margin-bottom: 30px;
        }

        .table-list {
            display: grid;
            grid-template-columns:
                repeat(auto-fill, minmax(250px, 1fr));
            gap: 20px;
        }

        .table-card {
            background: #fff;
            border-radius: 12px;
            padding: 24px;
            text-decoration: none;
            color: #333;
            box-shadow:
                0 2px 10px rgba(0, 0, 0, 0.08);
            transition: 0.2s;
        }

        .table-card:hover {
            transform: translateY(-4px);
        }

        .table-name {
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 12px;
        }

        .table-count {
            color: #666;
        }
    </style>
</head>

<body>

    <h1>
        Skill Checker DB GUI
    </h1>

    <div class="table-list">

        @foreach ($tables as $table)
        <a href="/admin/{{ $table['name'] }}" class="table-card">

            <div class="table-name"> {{ $table['name'] }} </div>

            <div class="table-count"> Records: {{ $table['count'] }} </div>

        </a>
        @endforeach

    </div>

</body>

</html>