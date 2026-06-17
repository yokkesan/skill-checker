<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="UTF-8">

    <meta name="viewport"
        content="width=device-width, initial-scale=1.0">

    <title>
        {{ $table }}
    </title>

    <style>
        body {
            font-family: sans-serif;
            background: #f5f5f5;
            padding: 40px;
        }

        h1 {
            margin-bottom: 20px;
        }

        .back-link {
            display: inline-block;
            margin-bottom: 20px;
        }

        .table-info {
            margin-bottom: 20px;
            color: #666;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            background: white;
        }

        th,
        td {
            border: 1px solid #ddd;
            padding: 12px;
            text-align: left;
        }

        th {
            background: #eee;
            font-weight: bold;
        }

        tr:nth-child(even) {
            background: #fafafa;
        }
    </style>
</head>

<body>

    <a
        href="/admin"
        class="back-link"
    >
        ← Back
    </a>

    <h1>
        {{ $table }}
    </h1>

    <div class="table-info">
        Records:
        {{ $records->count() }}
    </div>

    @if ($records->isEmpty())
        <p>
            データがありません
        </p>
    @else
        <table>

            <thead>
                <tr>
                    @foreach (
                        array_keys(
                            (array) $records->first()
                        ) as $column
                    )
                        <th>
                            {{ $column }}
                        </th>
                    @endforeach
                </tr>
            </thead>

            <tbody>
                @foreach (
                    $records as $record
                )
                    <tr>
                        @foreach (
                            (array) $record
                            as $value
                        )
                            <td>
                                {{ $value }}
                            </td>
                        @endforeach
                    </tr>
                @endforeach
            </tbody>

        </table>
    @endif

</body>

</html>